import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useState, useRef } from 'react'
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaImage } from 'react-icons/fa'

const RichTextEditor = ({ initialContent = '', onUpdate }) => {
  const imageInputRef = useRef(null)
  const [imageUrl, setImageUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // Get HTML content from editor and pass to parent component
      const html = editor.getHTML()
      onUpdate(html)
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target.result
        editor.chain().focus().setImage({ src: dataUrl }).run()
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar flex flex-wrap items-center gap-2 p-2 border-b border-gray-200 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title="Underline"
        >
          <FaUnderline />
        </button>
        <span className="mx-1 text-gray-300">|</span>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title="Numbered List"
        >
          <FaListOl />
        </button>
        <span className="mx-1 text-gray-300">|</span>
        
        {/* Image upload options */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => imageInputRef.current.click()}
            className="p-2 rounded hover:bg-gray-100"
            title="Upload Image"
          >
            <FaImage />
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="flex items-center">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL"
              className="px-2 py-1 text-sm border border-gray-300 rounded"
            />
            <button
              onClick={addImage}
              disabled={!imageUrl}
              className="ml-1 px-2 py-1 text-sm bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      <EditorContent editor={editor} className="prose prose-sm max-w-none min-h-[150px] focus:outline-none" />
    </div>
  )
}

export default RichTextEditor