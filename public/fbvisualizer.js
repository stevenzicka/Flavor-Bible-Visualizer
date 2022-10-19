import nodes from './Nodes.js';
import links from './Links.js';
import searchData from './searchData.js';
import getNodeColor from './helpers/getNodeColor.js';
import * as d3 from "https://cdn.skypack.dev/d3@7";

const width = window.innerWidth
const height = window.innerHeight - 100

let originalNodes = [...nodes]
let originalLinks = [...links]
let baseLinks = [...links]
let baseNodes = nodes.map(d => Object.create(d))

let savedLinks = []

// Implement external dropdown menu
const dropdown = jSuites.dropdown(document.getElementById('dropdown'), {
    data: searchData,
    format: 0,
    autocomplete: true,
    lazyLoading: true,
    width: '280px',
});

// Test for the ingredients loading
// window.onload = (e) => {
//     for (let i = 0; i < searchData.length; i++) {
//         // console.log(searchData[i]);
//         renderInitialNode(searchData[i]["value"])
//         resetData()
//     }
// }

// Test for node duplicates
// let duplicates = []
// let count = 0
// for (let i = 0; i < baseNodes.length; i++) {
//     for (let j = 0; j < baseNodes.length; j++) {
//         if (baseNodes[i]["id"] == baseNodes[j]["id"]) {
//             count += 1
//         }
//     }
//     if (count > 1) {
//         duplicates.push(baseNodes[i]["id"])
//     }
//     count = 0
// }

// console.log(duplicates);

const svg = d3.select('svg')
svg.attr('width', width).attr('height', height)

const linkGroup = svg.append('g').attr('class', 'links')
const nodeGroup = svg.append('g').attr('class', 'nodes')
const textGroup = svg.append('g').attr('class', 'texts')

let linkElements,
  nodeElements,
  textElements,
  selectedId

const linkForce = d3
    .forceLink()
    .id(link => link.id)
    .strength(link => link.strength);

let simulation = d3
        .forceSimulation(baseNodes)
        .force('link', linkForce)
        .force('charge', d3.forceManyBody().strength(-120))
        .force('x', d3.forceX(width / 2))
        .force('y', d3.forceY(height / 2))
        .force('center', d3.forceCenter(width / 2, height / 2));

// Drag function run on ticks upon mouse drag of node
function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.7).restart();
        event.subject.fx = Math.max(event.subject.x, 10), (width - 30);
        event.subject.fy = Math.max(event.subject.y, 10), (height - 60);
    }
    
    function dragged(event) {
        event.subject.fx = Math.max(event.x, 10), (width - 30);
        event.subject.fy = Math.max(event.y, 10), (height - 60);
    }
    
    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

let selectedNodes = [];
let selectedLinks = [];
let mainNodes = [];
let nodeArrayCheck = [];

const form = document.getElementById('form')

// Updates graph with selected ingredient nodes and links upon user submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = dropdown.getText();
    if(!mainNodes.includes(text)) {
        mainNodes.push(text);
    }
    renderInitialNode(text)
})

function renderInitialNode(text) {
    getNode(text);
    // Render node based on user selection
    function getNode(text) {
        for(let i = 0; i < baseNodes.length; i++) {
            if(baseNodes[i]["id"] == text) {
                selectedNodes.push(baseNodes[i]);
            }
        }
    }

    // Render all nodes that are targets of source node
    for(let i = 0; i < baseLinks.length; i++) {
        if(baseLinks[i]["source"] == text) {
            savedLinks.push(baseLinks[i])
            selectedLinks.push(baseLinks[i]);
            getNode(baseLinks[i]["target"]);
        }
    }

    if(selectedNodes.length > 0) {
        addItem(text);
    }
    updateSimulation()
}

// function renderOriginalNode(text) {
//     getNode(text);
    
//     // Render node based on user selection
//     function getNode(text) {
//         for(let i = 0; i < baseNodes.length; i++) {
//             if(baseNodes[i]["id"] == text) {
//                 selectedNodes.push(baseNodes[i]);
//             }
//         }
//     }

//     // Render all nodes that are targets of source node
//     for(let i = 0; i < baseLinks.length; i++) {
//         if(baseLinks[i]["source"] == text) {
//             selectedLinks.push(baseLinks[i]);
//             getNode(baseLinks[i]["target"]);
//         }
//     }
//     if(selectedNodes.length > 0) {
//         addItem(text);
//     }
//     updateSimulation()
// }

function selectNode(selectedNode) {
    selectedId = selectedNode.target.id

    if(!mainNodes.includes(selectedId) && selectedId != '') {
        mainNodes.push(selectedId);
    } 
    updateData(selectedId)
    updateColors()
}

function updateColors() {
    let neighbors = []
    nodeElements.attr('fill', node => getNodeColor(node, neighbors))
}

// Resets data to initial state
function resetData() {
    selectedNodes = []
    selectedLinks = []

    simulation.nodes(selectedNodes)
    simulation.force('link').links(selectedLinks)

    let originalLinks = rebuildObj(savedLinks)

    for (let i = 0; i < baseLinks.length; i++) {
        if ("index" in baseLinks[i]) {
            for (let j = 0; j < originalLinks.length; j++) {
                if (baseLinks[i]["target"]["id"] == originalLinks[j]["target"]) {
                    baseLinks[i] = originalLinks[j]
                }
            }
        }
    }

    // baseLinks = originalLinks
    // baseNodes = originalNodes
    updateSimulation()
}

// Rebuilds nodes that have been altered by D3 to their original state
function rebuildObj(savedLinks) {
    let originalLinks = []
    for (let i = 0; i < savedLinks.length; i++) {
        let source = savedLinks[i]["source"]["id"]
        let target = savedLinks[i]["target"]["id"]
        let strength = savedLinks[i]["strength"]
        let objLink = {source: source, target: target, strength: strength}
        originalLinks.push(objLink)
    }
    return originalLinks
}

// Updates the data with only nodes that the main nodes share links with 
function updateData(selectedId) {

    // Get all links associated with selectedId
    for(let i = 0; i < baseLinks.length; i++) {
        if(baseLinks[i]["source"] == selectedId) {
            nodeArrayCheck.push(baseLinks[i]);
        }
    }

    let selectedNodesTemp = []
    let selectedLinksTemp = []
    let text

    // Get array of only the links that the main node and selected node shares
    for (let i = 0; i < nodeArrayCheck.length; i++){
        for (let j = 0; j < selectedLinks.length; j++){
            if (nodeArrayCheck[i]["target"] == selectedLinks[j]["target"]["id"]){
                selectedLinksTemp.push(nodeArrayCheck[i])
                selectedLinksTemp.push(selectedLinks[j])
                savedLinks.push(nodeArrayCheck[i])
            }
        }
    }

    // Add all nodes from mainNodes
    for (let i = 0; i < mainNodes.length; i++){
        getNode(mainNodes[i])
    }

    function getNode(text) {
        for(let i = 0; i < baseNodes.length; i++) {
            if(baseNodes[i]["id"] == text) {
                selectedNodesTemp.push(baseNodes[i]);
            }
        }
    }

    // Add all nodes from selectedLinksTemp targets to selectedNodesTemp
    for(let i = 0; i < selectedLinksTemp.length; i++) {
        getNode(selectedLinksTemp[i]["target"]);
    }

    // Delete duplicate nodes and links
    selectedNodesTemp = uniq(selectedNodesTemp)

    // If the number of nodes or links changes is not none update the simulation
    if(selectedNodesTemp.length != 0 && selectedLinksTemp.length != 0){
        selectedLinks = selectedLinksTemp
        selectedNodes = selectedNodesTemp  

        // Update force strength to allow for better visibility of nodes
        simulation.force('charge', d3.forceManyBody().strength(-500))

        addItem(selectedId)  
        updateSimulation()
    } else {
        for (let i = 0; i < mainNodes.length; i++) {
            if (mainNodes[i] == selectedId) {
                mainNodes.splice(i, 1)
            }
        }
    }
    nodeArrayCheck = [];
    
}

// Uses hash lookups for prims and linear search with filters to remove duplicate values
function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

// Updates the graph to show the nodes and links from only the selected ingredients 
function updateGraph() {

    // links
    linkElements = linkGroup.selectAll('line').data(selectedLinks, link => link.target.id + link.source.id)
    linkElements.exit().remove()
  
    const linkEnter = linkElements.enter().append('line').attr('stroke-width', 1).attr('stroke', 'rgba(50, 50, 50, 0.2)')
  
    linkElements = linkEnter.merge(linkElements)
    simulation.force('link').links(selectedLinks)
  
    // nodes
    nodeElements = nodeGroup.selectAll('circle').data(selectedNodes, node => node.id)
    nodeElements.exit().remove()
  
    const nodeEnter = nodeElements
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('id', node => node.id)
        .call(drag(simulation))
        // we link the selectNode method here
        // to update the graph on every click
        .on('click', selectNode)
  
    nodeElements = nodeEnter.merge(nodeElements)
  
    // texts
    textElements = textGroup.selectAll('text').data(selectedNodes, node => node.id)
    textElements.exit().remove()
  
    const textEnter = textElements
        .enter()
        .append('text')
        .text(node => node.label)
        .call(drag(simulation))
        .attr('font-size', 12)
        .attr('dx', 15)
        .attr('dy', 4)
        .on('click', selectNode);
  
    textElements = textEnter.merge(textElements)
}

// Updates the simulation to include the new nodes, links, and text elements
function updateSimulation() {
    updateGraph()
    
    simulation.nodes(baseNodes).on('tick', () => {
        nodeElements.attr('cx', node => Math.min(Math.max(node.x, 10), (width - 30)))
            .attr('cy', node => Math.min(Math.max(node.y, 10), (height - 60)))
        textElements.attr('x', node => node.x).attr('y', node => node.y)
        linkElements
            .attr('x1', link => Math.min(Math.max(link.source.x, 10), (width - 30)))
            .attr('y1', link => Math.min(Math.max(link.source.y, 10), (height - 60)))
            .attr('x2', link => Math.min(Math.max(link.target.x, 10), (width - 30)))
            .attr('y2', link => Math.min(Math.max(link.target.y, 10), (height - 60)))
    })
    simulation.alpha(1)
    updateColors()
    simulation.restart()
  }


// Adds selected ingredient to table header and adds all of their links below 
function addItem(item) {

    let table = document.getElementById('tableHeader')

    if (table.childElementCount == mainNodes.length) {
        return
    }

    let tableItem = document.createElement('th')
    let newItem = document.createTextNode(item.toUpperCase())

    tableItem.appendChild(newItem);
    tableItem.className = 'tableItem';
    tableItem.setAttribute('id', item);

    let btn = document.createElement('button');
    btn.innerHTML = 'x';
    btn.id = 'btnDelete';
    btn.dataset.action = 'delete'

    tableItem.appendChild(btn)
    tableItem.innerHTML += '&#8594'
    table.appendChild(tableItem)

    let itemTarget = document.createElement('td')
    let tableBody = document.getElementById('tableBody')
    let newTarget 
    let rowItem 

    // Delete tr elements to replace with new ones based on links
    if (mainNodes.length >= 1) {
        tableBody.innerHTML = ''
    }

    let targets = []
    for (let i = 0; i < selectedLinks.length; i++) {
        if (selectedLinks[i]['source'] == item) {
            
            // Check if new target is a duplicate
            let isDup = "false"
            for (let j = 0; j < targets.length; j++) {
                if (targets[j] == selectedLinks[i]['target']) {
                    isDup = "true"
                }
            }

            if (isDup == "false") {
                targets.push(selectedLinks[i]['target'])
                rowItem = document.createElement('tr')
                rowItem.setAttribute('id', 'rowItem')
                if (selectedLinks[i]['strength'] == 0.5) {
                    newTarget = document.createElement('strong')
                    let target = document.createTextNode(selectedLinks[i]['target'])
                    newTarget.appendChild(target)
                } else if (selectedLinks[i]['strength'] == 0.9) {
                    newTarget = document.createElement('strong')
                    let target = document.createTextNode(selectedLinks[i]['target'].toUpperCase())
                    newTarget.appendChild(target)
                } else {
                    newTarget = document.createTextNode(selectedLinks[i]['target'])
                }

                itemTarget.appendChild(newTarget)
                itemTarget.classname = 'targetItem'
                itemTarget.setAttribute('id', selectedLinks[i]['target'])
                rowItem.appendChild(itemTarget)
                tableBody.appendChild(rowItem)
                itemTarget = document.createElement('td')
            }
        }
    }
    let tBody = document.getElementById('tableBody')
    let tRows = tBody.getElementsByTagName('td')
    for (let i = 0; i < tRows.length; i++) {
        tRows[i].onclick = function(){
            if(!mainNodes.includes(tRows[i]['id'])) {
                mainNodes.push(tRows[i]['id'])
            }
            updateData(tRows[i]['id'])
        }
    }
}

// Removes selected item from list and graph
searchTable.addEventListener('click', function(e) {
    if (e.target.dataset.action === 'delete') {
        e.target.closest('.tableItem').remove();
        for (let i = 0; i < mainNodes.length; i++){
            if (mainNodes[i] == e.target.closest('.tableItem').getAttribute('id')) {
                mainNodes.splice(i, 1);
            }
        }

        // Remove list of items 
        let tableHeader = document.getElementById('tableHeader')
        let tableBody = document.getElementById('tableBody')
    
        if (tableHeader.childElementCount < 1) {
            tableBody.innerHTML = ''
        }
    
        resetData()
        renderInitialNode(mainNodes[0])
        for (let i = 1; i < mainNodes.length; i++) {
            updateData(mainNodes[i])
        }
    }
});




