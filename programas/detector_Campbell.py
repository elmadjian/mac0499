#!/usr/bin/env python
# -*- coding: utf-8 -*-
#----------------------
#Criado por Cadu
#----------------------


import re, sys, time, threading
#Detector de leitura (Campbell, 2001)
#------------------------------------


class Detector (threading.Thread):

    def __init__(self, thresh, cv):
        threading.Thread.__init__(self)
        self.x_coord = []
        self.y_coord = []
        self.thresh = thresh
        self.state = 0
        self.ant_saccade = False
        self.stop = False
        self.cv = cv
        self.time = time.time()

        self.cnt_yes = 0
        self.cnt_no  = 0
        self.cnt_total = 0
        
    def run(self):
        self.detect(self.cv)
    
    def storeValues(self, x, y):
        self.x_coord.append(float(x))
        self.y_coord.append(float(y))
        
    def average(self):
        sum_x = 0
        sum_y = 0
        length = len(self.x_coord)
        for i in range(length):
            sum_x += self.x_coord[i]
            sum_y += self.y_coord[i]
        avg_x, avg_y = sum_x/length, sum_y/length
        self.x_coord[:] = []
        self.y_coord[:] = []
        return avg_x, avg_y
    
    def analyze_x(self, prev_x, avg_x):
        x = avg_x - prev_x
        #short right:          
        if 0.015 <= x < 0.05:
            self.state += 10
        #medium right:
        elif 0.05 < x <= 0.1:
            self.state += 5
        #long right:
        elif 0.1 < x:
            self.state = 0
        #short left:
        elif -0.05 <= x < -0.015:
            self.state -= 10
        #medium left:
        elif -0.1 <= x < -0.05:
            if self.ant_saccade:
                self.state += 5
            else:
                self.state -= 5
        #long left:
        elif x < -0.1:
            if self.ant_saccade:
                self.state += 5
            else:
                self.state = 0
        self.ant_saccade = False
            
    def analyze_y(self, prev_y, avg_y):
        y = prev_y - avg_y
        #short up:
        if -0.05 <= y < -0.015:
            self.state -= 5
        #long and medium up:
        elif y < -0.05:
            self.state = 0
        #short down:
        if 0.015 <= y < 0.05:
            self.ant_saccade = True
        #medium down:
        elif 0.05 <= y < 0.1:
            self.state -= 5
        #long down:
        elif 0.1 <= y:
            self.state = 0
    
    def detect(self, cv):
        prev_x = 0
        prev_y = 0
        while True:
            with cv:
                cv.wait()
            if self.stop:
                break
            avg_x, avg_y = self.average()
            self.analyze_y(prev_y, avg_y)
            self.analyze_x(prev_x, avg_x)
            prev_x = avg_x
            prev_y = avg_y
            if self.state >= self.thresh:
                #print("\rleitura detectada em", time.time() - self.time)
                self.cnt_yes += 3
            else:
                #print("\raguardando...", self.state)#, time.time(), end="") 
                self.cnt_no += 3
            self.cnt_total += 3                 
            
            
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
    for i in range(len(fr.x_coord)//3):
        detector.storeValues(fr.x_coord.pop(0), fr.y_coord.pop(0))
        detector.storeValues(fr.x_coord.pop(0), fr.y_coord.pop(0))
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
    