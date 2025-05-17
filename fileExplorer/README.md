# 🗂️ File & Folder Explorer

A fully interactive File and Folder Explorer built using React. This app allows users to manage files and folders through a clean, hierarchical interface powered by a tree data structure.

---

## 📌 Features

- Create folders, sub-folders, and files
- Collapse/expand folders with dynamic icons
- Proper icons for files and folders (open/closed state)
- Indented layout based on folder/file depth
- Add new file/folder **only inside folders**
- Delete any file or folder
- Rename file or folder with in-place input
- Auto-delete newly created node if name is empty
- Show error on renaming if name is empty
- Node controls (Add/Delete/Rename) only appear on **hover**
- Node highlights on **hover**

---

## 🌳 Tree Data Structure

The file system is represented as a **recursive tree structure**, where each folder can have children (files or subfolders). Here's a simplified example:

```json
{
  "id": "root",
  "name": "Root",
  "isFolder": true,
  "children": [
    {
      "id": "folder1",
      "name": "Folder 1",
      "isFolder": true,
      "children": [
        {
          "id": "file1",
          "name": "File 1.txt",
          "isFolder": false
        }
      ]
    },
    {
      "id": "file2",
      "name": "File 2.docx",
      "isFolder": false
    }
  ]
}
