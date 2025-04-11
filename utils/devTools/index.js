const MAP_F = {
  date: 'Field.DatePicker',
  select: 'Field.Select',
  input: 'Field.Input',
  text: 'Field.Input',
  number: 'Field.Number',
  dateRange: 'Field.DateRangePicker',
  checkbox: 'Field.Checkbox',
  radio: 'Field.Radio',
  upload: 'Field.Upload',
  password: 'Field.Password',
  textArea: 'Field.TextArea',
  time: 'Field.TimePicker',
}

const MAP_F_OPTIONS = {
  date: '',
  select: '\n\t\t\t\toptions={[]}',
  input: '',
  text: '',
  number: '',
  dateRange: '',
  checkbox: '\n\t\t\t\toptions={[]}',
  radio: '\n\t\t\t\toptions={[]}',
  upload: '',
  password: '',
  textArea: '',
  time: '',
}

const replaceS = function (txt) {
  let text = txt.toLowerCase().replace(/\s|-/g, '_')
  text = text.replace(/'|,|\.|\/|’|!|\?/g, '')
  text = text.replace(/{|}|<|>|\(|\)/g, '')

  return text
}

export const getRulesForm = function (key, field) {
  let rule = ''
  if (field.required) {
    rule = `${replaceS(key)}: {
        required: getMessageReq('${field.label}'),
      },\n\t\t\t`
  }

  return rule
}

export const getBuildValuesForm = function (key, field) {
  let value = ''
  const key2 = replaceS(key)

  if (field.type === 'date') {
    value += `${key2}: values.${key2} ? values.${key2}.format('YYYY-MM-DD') : null,\n\t\t\t`
  } else if (field.type === 'time') {
    value += `${key2}: values.${key2} ? values.${key2}.format('HH:mm') : null,\n\t\t\t`
  } else {
    value += `${key2}: values.${key2} ?? null,\n\t\t\t`
  }

  return value
}

export const genForm = function (setting) {
  let form = ''
  let rules = ''
  let values = ''
  if (setting) {
    for (const key in setting) {
      if (Object.hasOwnProperty.call(setting, key)) {
        const field = setting[key]
        form += `<${MAP_F[field.type]}
        label="${field.label}"
        name="${replaceS(key)}" ${MAP_F_OPTIONS[field.type]}
      />\n\t\t\t`

        rules += getRulesForm(key, field)
        values += getBuildValuesForm(key, field)
      }
    }
  }

  return { form, rules, values }
}


const inputText = `User ID --Key-in (num mber 4 digies)
First Name (Eng)* --Key-in (20 Chars)
First Name (Thai)* --Key-in (20 Chars)
Province* --select`;

const lines = inputText.split('\n');
const jsonOutput = {};

for (let i = 0; i < lines.length; i++) {
  const parts = lines[i].split('--');
  const label = parts[0].trim();
  const key = label.toLowerCase().replace(/ /g, '_');
  let type = 'text';
  let required = false;
  if (parts.length > 1) {
    const inputType = parts[1].toLowerCase().trim();
    if (inputType.includes('key-in')) {
      type = 'text';
    } else if (inputType.includes('select')) {
      type = 'select';
    }
    if (label.includes('*')) {
      required = true;
    }
  }
  jsonOutput[key] = { label, type, required };
}

function S1() {
  const inputText = `User ID
Key-in (num mber 4 digies)
First Name (Eng)*
Key-in (20 Chars)
First Name (Thai)*
Key-in (20 Chars)`;

  const lines = inputText.split('\n');
  let output = '';

  for (let i = 0; i < lines.length; i += 2) {
    const label = lines[i].trim();
    const inputType = lines[i + 1].trim();
    let required = '';
    if (label.includes('*')) {
      required = ' --required';
    }
    output += `${label} --${inputType}${required}\n`;
  }
}