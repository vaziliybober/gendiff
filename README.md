# Gendiff

<a href="https://codeclimate.com/github/vaziliybober/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/79d94e87e546b97a59ef/maintainability" /></a>
<a href="https://codeclimate.com/github/vaziliybober/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/79d94e87e546b97a59ef/test_coverage" /></a>
[![Continuous integration workflow](https://github.com/vaziliybober/frontend-project-lvl2/workflows/Continuous%20integration%20workflow/badge.svg)](https://github.com/vaziliybober/frontend-project-lvl2/actions)

Gendiff is an npm module that generates the difference between two configuration files and formats it into a string

The following configuration file types are supported: json (.json), yaml (.yml), ini (.ini)

## Example
    
<table>
<tr>
<th>file1.json</th>
<th>file2.json</th>
<th>result (stylish)</th>
<th>result (plain)</th>
<th>result (json)</th>
</tr>
<tr>
<td>
  
    {
      "hello": "world",
      "obj": {
        "foo": "bar",
        "node": {
          "array": [1],
          "str": "jkl;"
        }
      }
    }

</td>
<td>

    {
      "number": 17,
      "obj": {
        "foo": "bar",
        "node": {
          "array": [1],
          "str": "asdf"
        }
      }
    }

</td>
<td>

    {
      - hello: world
      + number: 17
        obj: {
            foo: bar
            node: {
                array: [
                    1
                ]
              - str: jkl;
              + str: asdf
            }
        }
    }

</td>
<td>

    Property 'hello' was removed
    Property 'number' was added with value: 17
    Property 'obj.node.str' was updated. From 'jkl;' to 'asdf'

</td>
<td>

[{"type":"leaf","name":"hello","status":"removed","value":"world"},{"type":"leaf","name":"number","status":"added","value":17},{"type":"node","name":"obj","children":[{"type":"leaf","name":"foo","status":"unchanged","value":"bar"},{"type":"node","name":"node","children":[{"type":"leaf","name":"array","status":"unchanged","value":[1]},{"type":"leaf","name":"str","status":"modified","valueBefore":"jkl;","valueAfter":"asdf"}]}]}]

</td>
</tr>
</table>

## Install

    npm install -g @vaziliybober/gendiff
    
## Use

    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.

    Options:
      -V, --version        output the version number
      -f, --format [type]  output format (default: "stylish")
      -h, --help           output usage information

## Demo

<details><summary>Show Demo</summary>
<a href="https://asciinema.org/a/362030" target="_blank"><img src="https://asciinema.org/a/362030.svg" /></a>
</details>
