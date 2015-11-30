#!/usr/bin/env python
# -*- coding: utf-8 -*-
#----------------------
#Criado por Cadu
#----------------------


import re, sys, time, threading, time
#Detector de leitura (Buscher et al., 2008)
#------------------------------------------
class Detector (threading.Thread):
    
    def __init__(self, thresh, cv):
        threading.Thread.__init__(self)
        self.x_coord = []     #current gaze point in x
        self.y_coord = []     #current gaze point in y
        self.thresh = thresh
        self.state = 0
        self.fixation_one = False #indicates if a previous fixation was detected
        self.fixation_two = False #indicates if a next fixation was detected 
        self.fix_counter = 0    
        self.stop = False      #terminates the thread
        self.cv = cv           #condition variable
        self.fixpool_one = [[0,0]]  #group of points considered for fixation
        self.fixpool_two = [[0,0]]
        self.end_fixation = 0
        self.time = time.time()

        self.cnt_yes = 0
        self.cnt_no  = 0
        self.cnt_total = 0
        
    def run(self):
        self.detect(self.cv)
    
    def storeValues(self, x, y):
        self.x_coord.append(float(x))
        self.y_coord.append(float(y))
    
    def analyze(self, point):
        #detect the first fixation
        if not self.fixation_one:
            for p in self.fixpool_one:
                distance = self.distance(point, p)
                if distance > 0.005 or distance < -0.005:
                    self.fixpool_one.pop(0)
                    break
            self.fixpool_one.append(point)
            if len(self.fixpool_one) == 3:
                self.fixation_one = True

        #detect the next fixation
        if self.fixation_one and not self.fixation_two:
            for p in self.fixpool_one:
                distance = self.distance(point, p)
                if distance > 0.008 or distance < -0.008:
                    for q in self.fixpool_two:
                        distance2 = self.distance(point, q)
                        if distance2 > 0.005 or distance2 < -0.005:
                            self.fixpool_two.pop(0)
                            break
                    self.fixpool_two.append(point)
                    if len(self.fixpool_two) == 3:
                        self.fixation_two = True
                    break
            self.fixpool_one.append(point)

        #when both fixations are detected, analyze gaze pattern
        if self.fixation_one and self.fixation_two:
            d = self.distanceFromCenters(self.fixpool_two, self.fixpool_one)

            #read forward
            if 0.015 <= d[0] < 0.05:
                self.state += 10
            #skim forward
            elif 0.05 < d[0] <= 0.1:
                self.state += 5
            #skim jump
            elif 0.1 < d[0]:
                self.state -= 5
            #short regression
            elif -0.05 <= d[0] < -0.015:
                self.state -= 8
            #long regression
            elif -0.1 <= d[0] < -0.05:
                self.state -= 5
            #reset jump
            elif -0.1 > d[0] and d[1] < -0.01:
                self.state += 5

            if self.state > 100:
                self.state = 100
            elif self.state < -30:
                self.state = -30

            self.fixpool_one = [i for i in self.fixpool_two]
            self.fixpool_two = [[0,0]]
            self.fixation_two = False
   

    def detect(self, cv):
        while not self.stop:
            with cv:
                cv.wait()
            if self.x_coord:
                point = [self.x_coord.pop(), self.y_coord.pop()]
                self.analyze(point)
            if self.state >= self.thresh:
                #print("\rleitura detectada! ", self.state, "tempo:", time.time() - self.time)#, time.time(), end="")
                self.cnt_yes += 1
            else:
                #print("\raguardando...", self.state)#, time.time(), end="") 
                self.cnt_no += 1
            self.cnt_total += 1

    def distance(self, a, b):
        A = a[0]**2 + a[1]**2
        B = b[0]**2 + b[1]**2
        return A-B

    def distanceFromCenters(self, pointsA, pointsB):
        xA = [i[0] for i in pointsA]
        yA = [i[1] for i in pointsA]
        xB = [i[0] for i in pointsB]
        yB = [i[1] for i in pointsB]
        center_xA = (min(xA) + max(xA)) / 2
        center_yA = (min(yA) + max(yA)) / 2
        center_xB = (min(xB) + max(xB)) / 2
        center_yB = (min(yB) + max(yB)) / 2
        pA = [center_xA, center_yA]
        pB = [center_xB, center_yB]
        result = [pA[0]-pB[0], pA[1]-pB[1]]
        return result
           
            
#Lê o arquivo de entrada
#-----------------------
class FileReader:
    
    def __init__(self, filename):
        self.x_coord = []
        self.y_coord = []
        self.readFile(filename)
    
    def readFile(self, filename):
        pattern = re.compile("\d+.?\d+") 
        with open(filename, 'r') as sample:
            for line in sample:
                group = pattern.findall(line)
                if group:
                    self.x_coord.append(group[0])
                    self.y_coord.append(group[1])
      

#------------------------
if __name__ == '__main__':
    fr = FileReader(sys.argv[1])
    cv = threading.Condition()
    detector = Detector(30, cv)
    detector.start()
    for i in range(len(fr.x_coord)):
        detector.storeValues(fr.x_coord.pop(0), fr.y_coord.pop(0))
        with cv:
            cv.notify_all()
        time.sleep(0.001)
    detector.stop = True
    print("total:", detector.cnt_total)
    print("found:", detector.cnt_yes)
    percent = (detector.cnt_yes/detector.cnt_total)*100
    print("percent:", percent)
    print("inverse:", 100-percent)
    with cv:
        cv.notify_all()
    detector.join()
    
