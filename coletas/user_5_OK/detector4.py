#!/usr/bin/python 

import threading
import numpy as np
import re
import sys
import time
import math

#Detector de leitura (Elmadjian, 2015)
#------------------------------------

class Detector (threading.Thread):

    def __init__(self, thresh, cv):
        threading.Thread.__init__(self)
        self.next_x = None
        self.next_y = None
        self.thresh = thresh
        self.state = 0
        self.stop = False
        self.cv = cv
        self.elapsed = time.time()

        self.cnt_yes = 0
        self.cnt_no  = 0
        self.cnt_total = 0
        
    def run(self):
        self.detect(self.cv)
    
    def storeValues(self, next_point):
        self.next_x = next_point[0]
        self.next_y = next_point[1]

    def changeState(self, changeValue):
        self.state += changeValue
        if self.state > 100:
            self.state = 100
        elif self.state < -60:
            self.state = -60

    def changePercentage(self, var, value):
        var += value
        if var > 100:
            var = 100
        elif var < 15:
            var = 15
        return var

    def checkCombination(self, buff):
        if buff[0] and buff[1] and buff[2]:
            return True
        if buff[0] and buff[1] and not buff[2]:
            return True
        if buff[0] and not buff[1] and buff[2]:
            return True
        if not buff[0] and buff[1] and buff[2]:
            return True
        return False

    def detect(self, cv):
        prev_x = 0
        prev_y = 0
        reading_buff  = []
        yaxs_mov = np.array([])
        xaxs_mov = np.array([])
        finite_diff = 0.1
        short_mov = 0
        reading = 50
        skimming = 50

        while True:
            with cv:
                cv.wait()
            if self.stop:
                break
            dx = (self.next_x - prev_x) / finite_diff
            dy = (self.next_y - prev_y) / finite_diff
            yaxs_mov = np.append(yaxs_mov, [prev_y])
            xaxs_mov = np.append(xaxs_mov, [prev_x])

            #read forward
            if 0.15 < dx <1.5 and -0.5 < dy < 0.5:
                reading_buff.append(True)
                short_mov += 1

            #regression
            elif dx < -2.0 and -1.0 < dy < 0.0:
                reading_buff.append(False)
                if len(yaxs_mov) > 1 and short_mov >= 1:
                    criteria = np.ptp(xaxs_mov) * short_mov
                    xaxs_mov = np.array([])
                    yaxs_mov = np.array([])
                    short_mov = 0
                    if criteria < 2:
                        skimming = self.changePercentage(skimming, 10)
                        reading  = self.changePercentage(reading, -10)
                    else:
                        skimming = self.changePercentage(skimming, -10)
                        reading  = self.changePercentage(reading, 10)

            #fixations
            elif -0.15 < dx < 0.15 and -0.2 < dy < 0.2:
                pass

            #unrelated pattern
            else:
                self.changeState(-5)

            #validating window
            if len(reading_buff) == 3:
                if self.checkCombination(reading_buff):
                    self.changeState(15)
                else:
                    self.changeState(-15)
                reading_buff.pop(0)

            #detection triggering
            if self.state >= self.thresh:
                print("\rreading detected!", self.state, "reading:", reading, "skimming:", skimming,"#", end="")
                self.cnt_yes += 1
            else:
                #print("\rwaiting...", self.state, time.time() - self.elapsed, end="")
                self.cnt_no += 1
            prev_x = self.next_x
            prev_y = self.next_y
            self.cnt_total += 1



#Lê o arquivo de entrada
#-----------------------
class FileReader:
    
    def __init__(self, filename):
        self.x = []
        self.y = []
        self.time = []
        self.values = []
        self.readFile(filename)
    
    def readFile(self, filename):
        pattern = re.compile("\d+.?\d+") 
        with open(filename, 'r') as sample:
            for line in sample:
                group = pattern.findall(line)
                if group:
                    x = float(group[0])
                    y = float(group[1])
                    t = float(group[2])
                    self.x.append(x)
                    self.y.append(y)
                    self.time.append(t)
                    self.values.append([x,y,t])

#------------------------
if __name__ == '__main__':
    fr = FileReader(sys.argv[1])
    cv = threading.Condition()
    detector = Detector(30, cv)
    detector.start()
    #for i in fr.x:
    for i in range(len(fr.values) - 1):
        detector.storeValues(fr.values.pop(0))
        with cv:
            cv.notify_all()
        time.sleep(0.001)
        #fr.plota()

    detector.stop = True
    print("\ntotal:", detector.cnt_total)
    print("found:", detector.cnt_yes)
    print("not found:", detector.cnt_no)
    with cv:
        cv.notify_all()
    detector.join()