//make the tree like structure ✅
// make the expansion and the contraction of the nodes ✅
// adding and removing of the node ✅
// renaming of the file 

import { useState } from "react";
import "./App.css";
import json from "./data.json";

const List = ({ list, addNewNode, removeNode, editNode }) => {
  const [collapse, setCollapse] = useState({});
  const [editing, setEditing] = useState({});
  const [tempName, setTempName] = useState("");

  const handleEditStart = (nodeId) => {
    setEditing((prev) => ({
      ...prev,
      [nodeId]: true,
    }));
    const node = list.find((node) => node.id === nodeId);
    if (node) {
      setTempName(node.name);
    }
  };

  const handleEditSubmit=(nodeId)=>{
    setEditing((prev) => ({
      ...prev,
      [nodeId]: false,
    }));
    if (tempName.trim()) {
      editNode(nodeId, tempName)
    }
  }

  return (
    <div className="container">
      {list.map((node) => (
        <div className="node" key={node.id}>
          {node.isFolder && (
            <span
              onClick={() =>
                setCollapse((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {collapse?.[node.name] ? "-" : "+"}{" "}
            </span>
          )}
          <span>
            {editing[node.id] ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={() => handleEditSubmit(node.id)}
                onKeyDown={(e) => e.key === "Enter" && handleEditSubmit(node.id)}
                autoFocus
              />
            ) : (
              node.name
            )}
          </span>
          {node.isFolder && (
            <span onClick={() => addNewNode(node.id)}>
              <img
                className="node-img"
                src="https://img.icons8.com/?size=200&id=nXuqRAptBsl7&format=png"
                alt=""
              />
            </span>
          )}
          {node.isFolder && (
            <span onClick={() => removeNode(node.id)}>
              {" "}
              <img
                className="node-img"
                src="https://www.shutterstock.com/shutterstock/photos/1070229233/display_1500/stock-vector-trash-can-icon-vector-1070229233.jpg"
                alt=""
              />
            </span>
          )}
          <span onClick={() => handleEditStart(node.id)}>
            <img
              className="node-img"
              src="https://cdn-icons-png.flaticon.com/128/860/860814.png"
              alt=""
            />
          </span>
          {collapse?.[node.name] && node.children && (
            <List
              list={node.children}
              addNewNode={addNewNode}
              removeNode={removeNode}
              editNode={editNode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [data, setData] = useState(json);
  const addNewNode = (nodeId) => {
    const name = prompt("enter the name of the new node");
    const updateTree = (tree) => {
      return tree.map((node) => {
        if (node.id === nodeId) {
          const newNode = {
            id: Date.now(),
            name,
            isFolder: true,
            children: [],
          };
          return { ...node, children: [...node.children, newNode] };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const removeNode = (nodeId) => {
    const updateTree = (tree) => {
      return tree
        .filter((node) => node.id !== nodeId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };

    setData((prev) => updateTree(prev));
  };

  const editNode = (nodeId, newName) => {
    const updateTree = (tree) => {
      return tree.map((node) => {
        if (node.id === nodeId) {
          return { ...node, name: newName };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  return (
    <div>
      <h1>Folder/File Explorer</h1>
      <List
        list={data}
        addNewNode={addNewNode}
        removeNode={removeNode}
        editNode={editNode}
      />
    </div>
  );
}

export default App;
