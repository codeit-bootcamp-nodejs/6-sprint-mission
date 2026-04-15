class BinarySearchTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new BinarySearchTreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return newNode;
    }

    let currentNode = this.root;

    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return newNode;
        }

        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return newNode;
        }

        currentNode = currentNode.right;
      }
    }
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value === currentNode.value) {
        return currentNode;
      }

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(value) {
    let removedNode = null;

    const removeRecursive = (node, targetValue) => {
      if (node === null) {
        return null;
      }

      if (targetValue < node.value) {
        node.left = removeRecursive(node.left, targetValue);
        return node;
      }

      if (targetValue > node.value) {
        node.right = removeRecursive(node.right, targetValue);
        return node;
      }

      removedNode = new BinarySearchTreeNode(node.value);
      removedNode.left = node.left;
      removedNode.right = node.right;

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      let successorParent = node;
      let successorNode = node.right;

      while (successorNode.left !== null) {
        successorParent = successorNode;
        successorNode = successorNode.left;
      }

      if (successorParent !== node) {
        successorParent.left = successorNode.right;
        successorNode.right = node.right;
      }

      successorNode.left = node.left;
      return successorNode;
    };

    this.root = removeRecursive(this.root, value);
    return removedNode;
  }
}
