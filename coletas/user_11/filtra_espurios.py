#!/usr/bin/python

import os
import re

for file in os.listdir("."):
	if re.match("\d+_eye.*", file):
		new_file = ""
		with open(file, 'r') as arquivo:
			new_file += arquivo.readline()
			for line in arquivo:
				if not re.findall("-\d+\.\d+", line):
					new_file += line
		with open(file, 'w') as arquivo:
			arquivo.write(new_file)