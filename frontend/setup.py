# import itertools

# MOD = 10**9 + 7

# def number_of_ways(n, m):
#     result = 0
#     for points in itertools.product(range(1, m+1), repeat=n):
#         remaining_students = set(range(n))
#         eliminated = set()
#         round = 1
#         while remaining_students and len(remaining_students) > 1:
#             qualifying = {i for i in remaining_students if points[i] >= round}
#             if not qualifying:
#                 break
#             for i in remaining_students - qualifying:
#                 eliminated.add(i)
#             remaining_students = qualifying
#             round += 1
#         if not remaining_students:
#             result = (result + 1) % MOD
#     return result


# print(number_of_ways(2,5))
# print(number_of_ways(3,3))

if __name__ == "__main__":
    print("setup")
