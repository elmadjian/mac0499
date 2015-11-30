#!/usr/bin/env jython

import os, re

pattern  = re.compile("\d+.?\d+")

for filename in os.listdir('.'):
    x_pos    = []
    y_pos    = []
    t_pos    = []
    if re.match("\d+_eye.*", filename) and not filename.endswith('Hz.txt'):
        with open(filename, 'r') as file:
            count = 0
            for line in file:
                group = pattern.findall(line)
                if group:
                    if count % 3 == 0:
                        x_pos.append(group[0])
                        y_pos.append(group[1])
                        t_pos.append(group[2])
                    count += 1

        with open(filename[:-4] + "__10Hz.txt", 'w') as file:
            file.write("COORDENADA X\t COORDENADA Y\t TEMPO\n")
            for x in x_pos:
                y = "\t" + str(y_pos.pop(0)) + "\t"
                t = str(t_pos.pop(0)) + "\n"
                file.write(x + y + t)
