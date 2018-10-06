function getRootNode(rootClass, node) {
    var tNode = node;
    while (!tNode.classList.contains(rootClass))
        tNode = tNode.parentNode;
    return tNode;
}