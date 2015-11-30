#!/usr/bin/python 
# -*- coding: utf-8 -*-

import threading
import matplotlib.pyplot as plt
import numpy as np
import re
import sys
import time
import math

#Detector de leitura (Elmadjian, 2015)
#------------------------------------

class Detector (threading.Thread):

    def __init__(self, thresh_r, thresh_s, cv):
        threading.Thread.__init__(self)
        self.curr_x = None
        self.curr_y = None
        self.curr_t = None
        self.next_x = None
        self.next_y = None
        self.next_t = None
        self.thresh_reading = thresh_r
        self.thresh_skimming = thresh_s
        self.state_reading = 0
        self.state_skimming = 0
        self.ant_saccade = False
        self.stop = False
        self.cv = cv
        self.elapsed = time.time()

        self.cnt_read = 0
        self.cnt_skim = 0
        self.cnt_total = 0
        
    def run(self):
        self.detect(self.cv)
    
    def storeValues(self, next_point):
        self.next_x = next_point[0]
        self.next_y = next_point[1]
        self.next_t = next_point[2]

    def changeReadingState(self, changeValue):
        self.state_reading += changeValue
        if self.state_reading > 100:
            self.state_reading = 100
        elif self.state_reading < -30:
            self.state_reading = -30

    def changeSkimmingState(self, changeValue):
        self.state_skimming += changeValue
        if self.state_skimming > 100:
            self.state_skimming = 100
        elif self.state_skimming < -15:
            self.state_skimming = -15

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
        prev_t = 0.000000001
        diff_cnt = 0
        reading_buff  = []
        yaxs_mov = np.array([])
        xaxs_mov = np.array([])
        global dxlist
        global dylist
        global timelist
        global xlist
        global ylist
        global xdetected
        global tdetected
        global xnot_related
        global tnot_related
        global read_on
        global skim_on
        short_mov = 0
        reading = 50
        skimming = 50
        finite_diff = 0.1
        finite_cnt = 0
        fix_cnt = 0

        while True:
            with cv:
                cv.wait()
            if self.stop:
                break
            dx = (self.next_x - prev_x) / finite_diff
            dy = (self.next_y - prev_y) / finite_diff
            yaxs_mov = np.append(yaxs_mov, [prev_y])
            xaxs_mov = np.append(xaxs_mov, [prev_x])

            finite_cnt += 0.1
            timelist.append(finite_cnt)
            xlist.append(self.next_x)
            ylist.append(self.next_y)
            dxlist.append(dx)
            dylist.append(dy)

            #read forward
            if 0.15 < dx < 1.0 and -0.5 < dy < 0.5:
                fix_cnt = 0
                self.changeReadingState(10)
                self.changeSkimmingState(5)

            #skim forward
            elif 1.0 <= dx < 2.0 and -0.8 < dy < 0.8:
                fix_cnt = 0
                self.changeReadingState(5)
                self.changeSkimmingState(10)

            #long skim
            elif 2.0 <= dx and -1.2 < dy < 1.2:
                fix_cnt = 0
                self.changeReadingState(-5)
                self.changeSkimmingState(8)

            #regression
            elif dx < -2.0 and -1.0 < dy < 0.0:
                fix_cnt = 0
                self.changeReadingState(5)
                self.changeSkimmingState(5)

            #fixations
            elif -0.15 < dx < 0.15 and -0.2 < dy < 0.2:
                fix_cnt += 1
                if fix_cnt % 10 == 0:
                    self.changeReadingState(-5)
                    self.changeSkimmingState(-5)

            #unrelated pattern
            else:
                fix_cnt = 0
                self.changeReadingState(-10)
                self.changeSkimmingState(-5)
                xnot_related.append(self.next_x)
                tnot_related.append(finite_cnt)

            #label state
            if self.state_reading > self.state_skimming:
                self.cnt_read += 1
                read_on.append(finite_cnt)
            elif self.state_reading < self.state_skimming:
                self.cnt_skim += 1
                skim_on.append(finite_cnt)

            prev_x = self.next_x
            prev_y = self.next_y
            prev_t = self.next_t
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
    detector = Detector(30, 20, cv)
    detector.start()
    timelist = []
    dxlist = []
    dylist = []
    xlist = []
    ylist = []
    xdetected = []
    tdetected = []
    read_on = []
    skim_on = []
    xnot_related = []
    tnot_related = []
    for i in range(len(fr.values) - 1):
        #detector.storeValues(fr.x.pop(0), fr.y.pop(0), fr.time.pop(0))
        detector.storeValues(fr.values.pop(0))#, fr.values[0])
        with cv:
            cv.notify_all()
        time.sleep(0.001)
        #fr.plota()

    detector.stop = True
    print("total:", detector.cnt_total)
    print("reading:", detector.cnt_read)
    print("skimming:", detector.cnt_skim)
    with cv:
        cv.notify_all()
    detector.join()

    #plot everything:
    # plt.plot(timelist, dxlist, 'bo-')
    # plt.grid()
    # plt.show()
    # plt.plot(timelist, dylist, 'ro-')
    # plt.grid()
    # plt.show()
    plt.plot(timelist, xlist, 'bo-')
    plt.plot(timelist, ylist, 'ro-')
    last = timelist[-1]
    ceil = max(max(xlist), max(ylist))
    #print(read_on)
    for i in range(len(read_on) - 1):
        if read_on[i+1] - read_on[i] <= 0.15:
            plt.axhspan(0.0, ceil, read_on[i]/last, read_on[i+1]/last, edgecolor='none', facecolor='y', alpha=0.5)

    for i in range(len(skim_on) - 1):
        if skim_on[i+1] - skim_on[i] <= 0.15:
            plt.axhspan(0.0, ceil, skim_on[i]/last, skim_on[i+1]/last, edgecolor='none', facecolor='g', alpha=0.5)

    plt.ylim(0, max(ylist))
    plt.xlim(0, max(timelist))
    plt.grid()
    plt.show()