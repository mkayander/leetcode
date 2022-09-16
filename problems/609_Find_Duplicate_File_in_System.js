/**
 * @param {string[]} paths
 * @return {string[][]}
 */
const findDuplicate = function (paths) {
    const map = {};

    for (const item of paths) {
        const [path, ...files] = item.split(" ");

        for (const file of files) {
            const [, filename, content] = file.match(/(.+)\((\w+)\)/);
            const fullPath = `${path}/${filename}`;

            if (map[content]) {
                map[content].push(fullPath);
            } else {
                map[content] = [fullPath];
            }
        }
    }

    return Object.values(map).filter((item) => item.length > 1);
};

console.log(
    findDuplicate(["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"])
);
