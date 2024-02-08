import sys
import joblib
import numpy as np
import warnings
warnings.filterwarnings('ignore')

from sklearn.linear_model import LinearRegression

args = []
for arg in sys.argv[1:]:
    args.append(float(arg))
args = np.array(args).reshape(1, -1)

model = joblib.load("model.jbl.lzma")
out = model.predict(args)
print(out[0][0])