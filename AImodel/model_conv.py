import tensorflowjs as tfjs
import tensorflow as tf


reloaded = tf.keras.models.load_model('./base_TL_V4/MobileNet V2_v4')
reloaded.summary()

tfjs.converters.save_keras_model(reloaded, "./")