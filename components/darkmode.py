import numpy as np

#===============================================================================
# Draw Sun
#===============================================================================
print("Draw Sun:")
OX = 10
OY = 10

R1 = 4
print(f"M {OX} {OY-R1} a {R1} {R1} 0 0 0 0 {2 * R1} a {R1} {R1} 0 0 0 0 {-2 * R1}")

rectX = 10
rectY = 0
L = 4
W = 1.0

def rotate(points, theta, ox=0, oy=0):
  points2 = points - [ox, oy]
  rotate_matrix = np.array([[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]])
  points3 = points2 @ rotate_matrix.T
  return points3 + [ox, oy]

points = np.array([[rectX-W/2, rectY],[rectX+W/2, rectY],[rectX+W/2, rectY+L], [rectX-W/2, rectY+L]])
print(f"M {points[0][0]:.3f} {points[0][1]:.3f} L {points[1][0]:.3f} {points[1][1]:.3f} L {points[2][0]:.3f} {points[2][1]:.3f} L {points[3][0]:.3f} {points[3][1]:.3f} z")

for _ in range(7):
  points = rotate(points, np.pi/4, OX, OY)
  print(f"M {points[0][0]:.3f} {points[0][1]:.3f} L {points[1][0]:.3f} {points[1][1]:.3f} L {points[2][0]:.3f} {points[2][1]:.3f} L {points[3][0]:.3f} {points[3][1]:.3f} z")

#===============================================================================
# Draw Moon
#===============================================================================
def getMoonArecCenter(R1, R2, theta1):
    A = R1 * np.array([np.cos(theta1), np.sin(theta1)])
    B = R1 * np.array([np.cos(-theta1), np.sin(-theta1)])
    X2 = A[0] - np.sqrt(R2**2 - A[1]**2)
    theta2 = np.arcsin(R1 * np.sin(theta1) / R2)
    S2 = R2**2 * theta2 / 2 - np.absolute(R2**2 * np.cos(theta2) * np.sin(theta2) / 2)
    S1 = R1**2 * theta1 / 2 +  np.absolute(R1**2 * np.cos(theta1) * np.sin(theta1) / 2) - S2
    a = A[0]
    b = X2 + R2
    xS2 = (R2**2 - (b - X2)**2)**(3/2)/(-3) - (R2**2 - (a - X2)**2)**(3/2)/(-3) + X2*S2
    c = A[0]
    d = R1
    xS1 = (R1**2 - d**2)**(3/2)/(-3) - (R1**2 - c**2)**(3/2)/(-3)
    return np.array([(xS1 - xS2)/S1, 0])
def getMoon(R1, R2, theta1, theta2, OX, OY):
    A = R1 * np.array([np.cos(theta1), np.sin(theta1)])
    B = R1 * np.array([np.cos(-theta1), np.sin(-theta1)])
    center = getMoonArecCenter(R1, R2, theta1)
    rotate_matrix = np.array([
        [np.cos(theta2), -np.sin(theta2)],
        [np.sin(theta2), np.cos(theta2)]
    ])

    A_ = rotate_matrix @ A - rotate_matrix @ center + [OX, OY]
    B_ = rotate_matrix @ B - rotate_matrix @ center + [OX, OY]
    return A_, B_

print("Draw Moon:")
OX = 10
OY = 10

R1 = 8
R2 = 10

theta1 = np.pi*5/8
theta2 = np.pi/8

A, B = getMoon(R1, R2, theta1, theta2, OX, OY)
print(A, B)

print(f"M {B[0]:.3f} {B[1]:.3f} A {R1:.3f} {R1:.3f} 0 1 1 {A[0]:.3f} {A[1]:.3f} A {R2:.3f} {R2:.3f} 0 0 0 {B[0]:.3f} {B[1]:.3f}z")

#===============================================================================
# Draw MoonSun
#===============================================================================
def getHalfMoon(R1, theta1, dx):
    A = R1 * np.array([np.cos(theta1), np.sin(theta1)])
    B = R1 * np.array([np.cos(-theta1), np.sin(-theta1)])
    A -= [dx, 0]
    B -= [dx, 0]
    C = np.array([0, np.sqrt(R1**2 - dx**2)])
    D = np.array([0, -np.sqrt(R1**2 - dx**2)])
    return A, B, C, D


print("Draw MoonSun:")
OX = 10
OY = 10

R1 = 8
R2 = 10

theta1 = np.pi*5/8
dx = 4

A, B, C, D = getHalfMoon(R1, theta1, dx)
A += [OX, OY]
B += [OX, OY]
C += [OX, OY]
D += [OX, OY]
print(A, B, C, D)

bias_x = 1.5
A -= [bias_x, 0]
B -= [bias_x, 0]
C -= [bias_x, 0]
D -= [bias_x, 0]

print(A)

print(f"M {A[0]:.3f} {A[1]:.3f} A {R1:.3f} {R1:.3f} 0 0 0 {C[0]:.3f} {C[1]:.3f}")
print(f"L {D[0]:.3f} {D[1]:.3f} A {R1:.3f} {R1:.3f} 0 0 0 {B[0]:.3f} {B[1]:.3f}")
print(f"A {R2:.3f} {R2:.3f} 0 0 1 {A[0]:.3f} {A[1]:.3f}z")

R1 = 4
A = np.array([[OX, OY-R1], [OX, OY+R1]])
print(f"M {A[0][0]:.3f} {A[0][1]:.3f} A {R1:.3f} {R1:.3f} 0 0 1 {A[1][0]:.3f} {A[1][1]:.3f}")

rectX = 10
rectY = 0
L = 4
W = 1.0

points = np.array([[rectX-W/2, rectY],[rectX+W/2, rectY],[rectX+W/2, rectY+L], [rectX-W/2, rectY+L]])
print(f"M {points[0][0]:.3f} {points[0][1]:.3f} L {points[1][0]:.3f} {points[1][1]:.3f} L {points[2][0]:.3f} {points[2][1]:.3f} L {points[3][0]:.3f} {points[3][1]:.3f} z")

for i in range(4):
  points = rotate(points, np.pi/4, OX, OY)
  print(f"M {points[0][0]:.3f} {points[0][1]:.3f} L {points[1][0]:.3f} {points[1][1]:.3f} L {points[2][0]:.3f} {points[2][1]:.3f} L {points[3][0]:.3f} {points[3][1]:.3f} z")
