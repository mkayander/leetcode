# trees with money

from typing import List

def solve_2_p(n : int, k: int, a: List[int], h: List[int]) -> int:
    l = 0
    count = 0
    max_len = 0

    for r in range(n):
        if r > 0 and h[r - 1] % h[r] != 0:
            count = 0
            l = r

        count += a[r]

        if count > k:
            count -= a[l]
            l += 1

        max_len = max(max_len, r - l + 1)

    return max_len


class Input:
    def __init__(self, n, k, a, h):
        self.n = n
        self.k = k
        self.a = a
        self.h = h

                
def parse_input() -> List[Input]:
    m = int(input())
    inputs = []
    for _ in range(m):
        n, k = map(int, input().split())
        a = list(map(int, input().split()))
        h = list(map(int, input().split()))
        inputs.append(Input(n, k, a, h))
    return inputs


if __name__ == "__main__":
    inputs = parse_input()
    for inp in inputs:
        print(solve_2_p(inp.n, inp.k, inp.a, inp.h))
