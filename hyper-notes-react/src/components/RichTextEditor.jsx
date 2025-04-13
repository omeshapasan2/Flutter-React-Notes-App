import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useState, useRef, useEffect } from 'react'
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaListUl, 
  FaListOl, 
  FaImage, 
  FaLink, 
  FaUnlink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaPalette
} from 'react-icons/fa'

const RichTextEditor = ({ initialContent = '', onUpdate, showToolbar = true }) => {
  const imageInputRef = useRef(null)
  const [imageUrl, setImageUrl] = useState('')
  const editorContainerRef = useRef(null)
  const initializedRef = useRef(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [textColor, setTextColor] = useState('#000000')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // Get HTML content from editor and pass to parent component
      const html = editor.getHTML()
      onUpdate(html)
    },
  })

  // Set initial content only once when editor is ready
  useEffect(() => {
    if (editor && !initializedRef.current && initialContent) {
      editor.commands.setContent(initialContent)
      initializedRef.current = true
    }
  }, [editor, initialContent])

  // Handle clipboard paste events for images
  useEffect(() => {
    const handlePaste = (event) => {
      if (editor && event.clipboardData && event.clipboardData.items) {
        const items = event.clipboardData.items
        
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            event.preventDefault()
            
            const file = items[i].getAsFile()
            const reader = new FileReader()
            
            reader.onload = (e) => {
              const dataUrl = e.target.result
              editor.chain().focus().setImage({ src: dataUrl }).run()
            }
            
            reader.readAsDataURL(file)
            break
          }
        }
      }
    }

    // Add paste event listener to the editor container
    if (editorContainerRef.current) {
      editorContainerRef.current.addEventListener('paste', handlePaste)
    }

    // Cleanup
    return () => {
      if (editorContainerRef.current) {
        editorContainerRef.current.removeEventListener('paste', handlePaste)
      }
    }
  }, [editor, editorContainerRef.current])

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

  const setLink = () => {
    if (linkUrl) {
      // Add https:// protocol if not present
      const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`
      
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
      
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run()
  }

  const setTextColorHandler = () => {
    editor.chain().focus().setColor(textColor).run()
    setShowColorPicker(false)
  }

  const colorOptions = [
    '#000000', // Black
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#808080', // Gray
    '#800000', // Maroon
    '#008000', // Dark Green
  ]

  return (
    <div className="rich-text-editor border rounded shadow-sm" ref={editorContainerRef}>
      {showToolbar && (
        <div className="editor-toolbar flex flex-wrap items-center gap-2 p-2 border-b border-gray-200 mb-2">
          {/* Text styling */}
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

          {/* Text color */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded hover:bg-gray-100"
              title="Text Color"
            >
              <FaPalette style={{ color: textColor }} />
            </button>
            
            {showColorPicker && (
              <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-lg">
                <div className="grid grid-cols-5 gap-1 mb-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: color }}
                      onClick={() => setTextColor(color)}
                      title={color}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-6 h-6"
                  />
                  <button
                    onClick={setTextColorHandler}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="mx-1 text-gray-300">|</span>
          
          {/* Lists */}
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
          
          {/* Alignment options */}
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Align Left"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Align Center"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Align Right"
          >
            <FaAlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Justify"
          >
            <FaAlignJustify />
          </button>

          <span className="mx-1 text-gray-300">|</span>
          
          {/* Link options */}
          <div className="relative">
            <button
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Add Link"
            >
              <FaLink />
            </button>
            
            {showLinkInput && (
              <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-lg flex gap-1">
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Enter URL"
                  className="px-2 py-1 text-sm border border-gray-300 rounded"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setLink()
                    }
                  }}
                />
                <button
                  onClick={setLink}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={unsetLink}
            className={`p-2 rounded hover:bg-gray-100 ${!editor.isActive('link') ? 'opacity-50' : ''}`}
            disabled={!editor.isActive('link')}
            title="Remove Link"
          >
            <FaUnlink />
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
      )}
      
      <div className="p-4">
        <EditorContent 
          editor={editor} 
          className="prose prose-sm max-w-none min-h-[150px] focus:outline-none" 
        />
      </div>
    </div>
  )
}

export default RichTextEditor;