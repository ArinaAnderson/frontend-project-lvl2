### Hexlet tests and linter status:
[![Actions Status](https://github.com/ArinaAnderson/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ArinaAnderson/frontend-project-lvl2/actions)
### Build and test status:
![example workflow](https://github.com/ArinaAnderson/frontend-project-lvl2/actions/workflows/build-and-test.yml/badge.svg)
### Maintainability codeclimate status:
[![Maintainability](https://api.codeclimate.com/v1/badges/56e70f32768aa13cd51d/maintainability)](https://codeclimate.com/github/ArinaAnderson/frontend-project-lvl2/maintainability)
### Test coverage codeclimate status:
[![Test Coverage](https://api.codeclimate.com/v1/badges/56e70f32768aa13cd51d/test_coverage)](https://codeclimate.com/github/ArinaAnderson/frontend-project-lvl2/test_coverage)

# gendiff

It allows to generate differences between two given files as a tree.
This tree (**diffTree**) can be presented in 3 difeferent formats:
- stylish (string output)
- plain (string output)
- json (json output)

gendiff can be used as a **CLI ap** and as a **library** locally installed in your project.

## Installation
Since this is a part of a frontend-course I took, it has not been yet published to the public registry.
But you can still check it out and use it by following these steps:

```sh
make install
make publish
npm link
```

## Usage of gendiff as CLI app

You pass paths to files that need to be compared and a format you want to see the result in.

```sh
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Arguments:
  filepath1            path to file1
  filepath2            path to file2

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```
[gendiff of flat files (step3)](https://asciinema.org/a/GkIY3i7OgsPhuhpYjaumS8yqV)
[![asciicast](https://asciinema.org/a/GkIY3i7OgsPhuhpYjaumS8yqV.png)](https://asciinema.org/a/GkIY3i7OgsPhuhpYjaumS8yqV)

The supported formats of files to compare:
- json
- yaml

In the example below the files are kept in *__fixtures__* folder in the root of the project
and the format to demonastrate the diffTree is set to stylish (default value):

```sh
genDiff -f stylish  __fixtures__/file1.json __fixtures__/file2.yaml
```
[gendiff of yaml and json files (step5)](https://asciinema.org/a/wx9yhx5QOdsXYl8PJRBNmCBzm)
[![asciicast](https://asciinema.org/a/wx9yhx5QOdsXYl8PJRBNmCBzm.png)](https://asciinema.org/a/wx9yhx5QOdsXYl8PJRBNmCBzm)

## Formats of output

### stylish
[stylish format of gendiff output (step6)](https://asciinema.org/a/bKZ1LdAvZ9SJEsEUbrqqWZLuA)
[![asciicast](https://asciinema.org/a/bKZ1LdAvZ9SJEsEUbrqqWZLuA.png)](https://asciinema.org/a/bKZ1LdAvZ9SJEsEUbrqqWZLuA)

### plain
[plain format of gendiff output (step7)](https://asciinema.org/a/Q2XZ1fO2dEgXarEnDlslkPD6E)
[![asciicast](https://asciinema.org/a/Q2XZ1fO2dEgXarEnDlslkPD6E.png)](https://asciinema.org/a/Q2XZ1fO2dEgXarEnDlslkPD6E)

### json
[json format of gendiff output (step8)](https://asciinema.org/a/4D7wWrAn3MEISy26zbQGl2IYg)
[![asciicast](https://asciinema.org/a/4D7wWrAn3MEISy26zbQGl2IYg.png)](https://asciinema.org/a/4D7wWrAn3MEISy26zbQGl2IYg)
