import sys
import numpy as np
import matplotlib.pyplot as plt

if len(sys.argv) < 2:
    print 'USAGE: python %s EYE_DATA.txt'%sys.argv[0]
    sys.exit()
    
data = np.genfromtxt(sys.argv[1], delimiter='\t', skip_header=1)
data = data[data[:,2] >= 0] # Ignora amostras com timestamp menor que 0

plt.plot(data[:,0], data[:,1], '-o')
plt.show()