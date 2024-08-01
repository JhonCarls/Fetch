class BSTNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        const newNode = new BSTNode(key, value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(key) {
        return this.searchNode(this.root, key);
    }

    searchNode(node, key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            return this.searchNode(node.left, key);
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        } else {
            return node.value;
        }
    }

    delete(key) {
        this.root = this.deleteNode(this.root, key);
    }

    deleteNode(node, key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.deleteNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            const aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.value = aux.value;
            node.right = this.deleteNode(node.right, aux.key);
            return node;
        }
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    searchByTitleOrAuthor(titulo, autor) {
        const resultados = [];
        this.searchByTitleOrAuthorNode(this.root, titulo, autor, resultados);
        return resultados;
    }

    searchByTitleOrAuthorNode(node, titulo, autor, resultados) {
        if (node !== null) {
            if ((titulo && this.isApproximateMatch(node.value.titulo, titulo)) ||
                (autor && this.isApproximateMatch(node.value.autor, autor))) {
                resultados.push(node.value);
            }
            this.searchByTitleOrAuthorNode(node.left, titulo, autor, resultados);
            this.searchByTitleOrAuthorNode(node.right, titulo, autor, resultados);
        }
    }

    isApproximateMatch(str, substr) {
        if (!substr) return true;
        const distance = this.levenshteinDistance(str.toLowerCase(), substr.toLowerCase());
        return distance <= Math.ceil(substr.length / 3); // Allow a small error margin
    }

    levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                }
            }
        }

        return matrix[b.length][a.length];
    }
}

const librosBST = new BST();
