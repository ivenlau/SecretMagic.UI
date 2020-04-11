<template>
  <div ref="container" style="margin-top:10px; margin-bottom:10px">
    <quillEditor
      ref="editor"
      v-model="content"
      class="quill-editor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    />
    <input
      ref="uploadImg"
      type="file"
      style="display:none"
      accept="image/png, image/jpeg, image/gif"
      @change="uploadImage"
    >
  </div>
</template>
<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import imageResize from 'quill-image-resize-module'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import hljs from 'highlight.js'
// atom-one-dark, rainbow, railscasts
import 'highlight.js/styles/atom-one-dark.css'
import OssClient from '@/utils/client'

Quill.register('modules/imageResize', imageResize)

export default {
  name: 'Editor',
  components: { quillEditor },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // [{ 'script': 'sub' }, { 'script': 'super' }],
            // [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            // [{ 'color': [] }, { 'background': [] }],
            // [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video'],
            ['fullscreen']
          ],
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          syntax: {
            highlight: text => {
              return hljs.highlightAuto(text).value
            }
          }
        }
      },
      fullscreen: false
    }
  },
  computed: {
    editor() {
      return this.$refs.editor.$refs.editor
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.content = newVal
      }
    },
    content(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    }
  },
  mounted() {
    const fullScreenButton = document.querySelector('.ql-fullscreen')
    fullScreenButton.classList.add('el-icon-full-screen')
    fullScreenButton.style.cssText = 'border:1px solid; padding:0px'
    fullScreenButton.innerText = ''

    const clientHeight = `${document.documentElement.clientHeight}`
    fullScreenButton.addEventListener('click', () => {
      if (!this.fullscreen) {
        this.$refs.container.classList.add('full-screen')
        this.$refs.editor.$refs.editor.childNodes[0].style.height = `${clientHeight - 80}px`
      } else {
        this.$refs.container.classList.remove('full-screen')
        this.$refs.editor.$refs.editor.childNodes[0].style.height = `${350}px`
      }
      this.fullscreen = !this.fullscreen
    })
    this.$refs.editor.$refs.editor.childNodes[0].style.height = `${350}px`

    window.onresize = function temp() {
      const previousHeight = this.clientHeight
      this.clientHeight = `${document.documentElement.clientHeight}`
      if (previousHeight !== this.clientHeight) {
        // that.$refs.adminContainer.$el.style.height = this.clientHeight - 20 + 'px'
      }
    }

    console.log(this.$refs.editor)
    this.$refs.editor.quill.getModule('toolbar').addHandler('image', this.uploadImageHandler)
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    uploadImageHandler() {
      const input = this.$refs.uploadImg
      input.value = ''
      input.click()
    },
    async uploadImage(event) {
      const file = event.target.files[0]
      const point = file.name.lastIndexOf('.')
      const suffix = file.name.substr(point)
      const fileName = file.name.substr(0, point)
      const date = new Date().getTime()
      const fullName = `${fileName}_${date}${suffix}`
      const client = new OssClient()
      client.uploadFile(fullName, file).then(data => {
        const url = process.env.VUE_APP_REDIRECT_PREFIX + fullName
        const addImageRange = this.$refs.editor.quill.getSelection()
        const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0)
        this.$refs.editor.quill.insertEmbed(newRange, 'image', url)
        this.$refs.editor.quill.setSelection(1 + newRange)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.ql-blank{
  min-height: 300px;
}
.full-screen{
  background: white;
  margin-top: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-bottom: 1 !important;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
}
</style>
