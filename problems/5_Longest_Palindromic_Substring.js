const longestPalindrome = function (s) {
    let currentLongest = "";

    const computePalindrome = (start, end, palindrome) => {
        while (start >= 0 && end < s.length) {
            if (s[start] === s[end]) {
                palindrome = s[start] + palindrome + s[end];
                start--;
                end++;
                continue;
            }

            break;
        }

        return palindrome;
    };

    for (let i = 0; i < s.length; i++) {
        const first = computePalindrome(i - 1, i, "");
        const second = computePalindrome(i - 1, i + 1, s[i]);
        const third = computePalindrome(i, i + 1, "");

        if (first.length > currentLongest.length) currentLongest = first;
        if (second.length > currentLongest.length) currentLongest = second;
        if (third.length > currentLongest.length) currentLongest = third;
    }

    return currentLongest;
};

longestPalindrome("babad");
longestPalindrome("cbbd");
