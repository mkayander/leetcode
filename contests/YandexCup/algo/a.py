a, b, c = map(int, input().split(" "))
n = int(input())

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a * b // gcd(a, b)

lcm_ab = lcm(a, b)
lcm_bc = lcm(b, c)
lcm_ac = lcm(a, c)
lcm_abc = lcm(lcm_ab, c)


def f(x):
    return x // a + x // b + x // c - x // lcm_ab - x // lcm_bc - x // lcm_ac + x // lcm_abc

def binary_search():
    left = 0
    right = 10 ** 18
    while right - left > 1:
        mid = (left + right) // 2
        if f(mid) < n:
            left = mid
        else:
            right = mid
    return right

print(binary_search())
