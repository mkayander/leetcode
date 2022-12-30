/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
    const target = graph.length - 1;
    const result = [];
    const path = [];  /* current path */
    path.push(0); /* add start index to current path */

    dfs(graph, 0, target, result, path);

    return result;
};

function dfs(graph, node, target, result, path) {
    if (node === target) {
        result.push([...path]);
        return;
    }

    for (const neighbour of graph[node]) {
        path.push(neighbour);
        dfs(graph, neighbour, target, result, path);
        path.pop();
    }
}
