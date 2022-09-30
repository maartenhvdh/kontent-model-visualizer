function getNodesFromData(data) {
  return data.map(d => ({ id: d.id, label: d.name }));
}

function getEdgesFromData(data) {
  let edges = [];
  for (let i = 0, node; (node = data[i]); i++) {
    let typedModularContent = node.elements.filter(e => e.type == "LinkedItems" && e.allowedTypes.length > 0);
    for (let x = 0, mc; (mc = typedModularContent[x]); x++) {
      for (let a = 0, at; (at = mc.allowedTypes[a]); a++) {
        let newEdge = { id: `${i}_${x}_${a}`, from: node.id, to: at.id, value: 0 };
        let found = edges.findIndex(edge => edge.from == newEdge.from && edge.to == newEdge.to);
        if (found > -1)
          edges[found].value += 1;
        else
          edges.push(newEdge);
      }
    }
  }
  return edges
}

function getSelectedNodeEdges(selected, linked) {
  let allEdges = getEdgesFromData([...linked, selected]);
  let edges = allEdges.filter(edge => edge.to == selected.id || edge.from == selected.id);
  return edges;
}

function getModelRelations(selected, linked) {
  let links = [];
  for (let i = 0, linkedModel; (linkedModel = linked[i]); i++) {
    let foundLinks = linkedModel.elements.filter(e => e.type == "LinkedItems" && e.allowedTypes.length > 0 && e.allowedTypes.map(t => t.id).includes(selected.id));
    let resultLink = { name: linkedModel.name, codename: linkedModel.codename, elements: [] };
    for (let x = 0, link; (link = foundLinks[x]); x++) {
      resultLink.elements.push({ name: link.name, codename: link.codename });
    }
    if (resultLink.elements.length > 0) links.push(resultLink);
  }
  return links;
}

function getSelectedNodeData(selectedNode, data) {
  let nodeData = data.find(n => n.id == selectedNode.id);
  return {
    id: nodeData.id,
    name: nodeData.name,
    codename: nodeData.codename,
    current: data.filter(d => d.id == selectedNode.id)[0],
    links: data.filter(d => selectedNode.selectedNodes.includes(d.id) && d.id != selectedNode.id)
  };
}

function getClickedNodeVisDataObject(nodeId, edges) {
  return {
    nodes: [nodeId],
    edges: [...new Set(edges.filter(e => e.to == nodeId || e.from == nodeId))].map(e => e.id)
  }
}


export { getNodesFromData, getEdgesFromData, getSelectedNodeEdges, getModelRelations, getSelectedNodeData, getClickedNodeVisDataObject }