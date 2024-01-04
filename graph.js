class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }
    
  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of this.nodes) {
      node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let result = [];
    let toVisitStack = [start];
    let seen = new Set([start]);

    while (toVisitStack.length > 0) {
      let currNode = toVisitStack.pop();
      result.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let result = [];
    let toVisitQueue = [start];
    let seen = new Set([start]);

    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();
      result.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return result;
  }

  // this function finds the shortest path in an unweighted, undirected graph
  shortestPath(source, target) {
    const queue = [source];
    const visited = new Set([source]);
    const parentMap = new Map();
    parentMap.set(source, null);

    while (queue.length > 0) {
      const current = queue.shift();

      for (let neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
          parentMap.set(neighbor, current);

          if (neighbor === target) {
            return this.constructPath(parentMap, source, target);
          }
        }
      }
    }
    return null;
  }

  constructPath(parentMap, source, target) {
    const path = [];
    let current = target;

    while (current !== null) {
      path.unshift(current);
      current = parentMap.get(current);
    }

    return path;
  }
}

module.exports = {Node, Graph}