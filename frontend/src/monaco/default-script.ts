const defaultScarScript = `# Calculates all the possible palindrome numbers
# in a given range and returns them in an array.

func palindromeBetween(min, max) {
    var result = []

    while (min <= max) {
        var temp = min
        var reverse = 0

        while (temp) {
            var rem = temp % 10
            var temp = temp / 10
            var reverse = reverse * 10 + rem
        }

        if (min == reverse) -> result + min
        var min = min + 1
    }

    return result
}

print(palindromeBetween(0, 200))
`

export default defaultScarScript;