# Gendiff

[![Maintainability](https://api.codeclimate.com/v1/badges/612755e24ddd3a3ccb2e/maintainability)](https://codeclimate.com/github/vaziliybober/gendiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/612755e24ddd3a3ccb2e/test_coverage)](https://codeclimate.com/github/vaziliybober/gendiff/test_coverage)
[![Continuous integration workflow](https://github.com/vaziliybober/gendiff/workflows/Continuous%20integration%20workflow/badge.svg)](https://github.com/vaziliybober/gendiff/actions)

Gendiff is an npm module that generates the difference between two configuration files and formats it into a string

The following configuration file types are supported: json (.json), yaml (.yml), ini (.ini)

This is the lvl-2 frontend project on https://ru.hexlet.io/

## Example

In this example three pairs of files are containing the same data, but in different formats. Because the data itself is the same, the gendiff applied to all the three sets of data will lead to equal results:

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
<td rowspan="5">

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
<td rowspan="5">

    Property 'hello' was removed
    Property 'number' was added with value: 17
    Property 'obj.node.str' was updated. From 'jkl;' to 'asdf'
</td>
<td rowspan="5">

[{"type":"leaf","name":"hello","status":"removed","value":"world"},{"type":"leaf","name":"number","status":"added","value":17},{"type":"node","name":"obj","children":[{"type":"leaf","name":"foo","status":"unchanged","value":"bar"},{"type":"node","name":"node","children":[{"type":"leaf","name":"array","status":"unchanged","value":[1]},{"type":"leaf","name":"str","status":"modified","valueBefore":"jkl;","valueAfter":"asdf"}]}]}]

</td>
</tr>

<tr>
<th>file1.yml</th>
<th>file2.yml</th>
</tr>

<tr>
<td>
    
    hello: world
    obj:
      foo: bar
      node:
        array:
          - 1
        str: jkl;
</td>
<td>

    hello: world
    obj:
      foo: bar
      node:
        array:
          - 1
        str: jkl;
</td>   
</tr>


<tr>
<th>file1.ini</th>
<th>file2.ini</th>
</tr>

<tr>
<td>

    hello=world

    [obj]
    foo=bar

    [obj.node]
    array[]=1
    str=jkl\;
</td>
<td>

    number=17

    [obj]
    foo=bar

    [obj.node]
    array[]=1
    str=asdf
</td>   
</tr>
</table>

## Install

    npm install -g @vaziliybober/gendiff

## Clone
    
    git clone https://github.com/vaziliybober/gendiff.git
    cd gendiff/
    make install
    make link
    
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
