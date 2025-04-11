import fs from 'fs'

async function handler(
  req,
  res,
) {

  const { name } = req.body
  try {
    let template = fs.readFileSync('store/features/templateSlice.text').toString()
    template = template.replace(/{{name}}/g, name)
    const savePath = `store/features/${name}Slice.js`

    fs.writeFileSync(savePath, template)

    let template_index = fs.readFileSync('store/features/index.js').toString()
    template_index = template_index.replace(/\/\/ {{import}}/g, `import ${name} from './${name}Slice'\n// {{import}}`)
    template_index = template_index.replace(/\/\/ {{export}}/g, `\t${name},\n// {{export}}`)

    fs.writeFileSync('store/features/index.js', template_index)
  } catch (error) {
  }

  res.redirect('/dev-tools/gen-reducer')
}

export default handler

/**
 * example json request
 * {
    "path": "/order",
    "savePath": "features/example/screen/form.js",
    "form": {
        "date": {
            "label": "Date label",
            "type": "date"
        },
        "company": {
            "label": "Company",
            "type": "select"
        },
        "input": {
            "label": "Input",
            "type": "input",
            "required": true
        },
        "number": {
            "label": "Number",
            "type": "number",
            "required": true
        },
        "dateRange": {
            "label": "DateRange",
            "type": "dateRange"
        },
        "checkbox": {
            "label": "Checkbox",
            "type": "checkbox"
        },
        "radio": {
            "label": "Radio",
            "type": "radio"
        },
        "password": {
            "label": "Password",
            "type": "password"
        },
        "textArea": {
            "label": "TextArea",
            "type": "textArea"
        },
        "time": {
            "label": "Time",
            "type": "time"
        }
    }
}
 */
