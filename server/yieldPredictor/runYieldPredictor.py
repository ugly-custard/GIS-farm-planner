import sys
import joblib
import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MinMaxScaler

args = []
for i, arg in enumerate(sys.argv[1:]):
    if i in [0, 1, 4, 5, 7]:
        args.append(float(arg))
    else:
        args.append(arg)
args = np.array(args).reshape(1, -1)

#label_encoder = joblib.load("labelEncoder.jbl.lzma")
#ct = joblib.load("columnTransformer.jbl.lzma")

for col in [2, 3, 6, 8, 9, 10, 11, 12, 13]:
    args[:, col] = LabelEncoder().fit_transform(args[:, col])

numeric_transformer = MinMaxScaler()
ct = ColumnTransformer(transformers = [('num', numeric_transformer, [0, 1, 4, 5, 7])], remainder='passthrough')

X = np.array(ct.fit_transform(args[:, ]))

model = joblib.load("model.jbl.lzma")
out = model.predict(args)
print(out[0][0], out[0][1])