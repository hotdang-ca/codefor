# Data Analysis Demo App
The following app is written in **express** and **node**, with **pug** for a template engine, and **PapaParse** for data parsing, for the demonstration purposes only.

## Instructions
Unzip the package (you’ve already done this), and provided that you have node and nom installed, you can simply run `npm install` in the resulting folder from the command line, followed by `npm start`.

If you’d like to specify a different csv source file, provide this as an additional parameter, e.g., `npm start http://path.to/file.csv`

If you do not have access to Node or Npm, please [contact me](mailto:james@hotdang.ca), or checkout the [demo site](http://rocky-beach-79032.herokuapp.com/). (**Note**: it is strongly inadvised to transmit a .zip file with the node dependencies contained within).

## Notes
When you start the node server, URLs are provided; the root is the front-end, with four options along the top.

- "**View Summary**" will show the analysis of each Violation type. 
- "**View All Data**" displays a table of the raw data, with DataTables enhancements (sort, search, pagination). clicking
on a violation type will show the analysis for just that violation.
- "**View Raw Data**" allows you to see the JSON data of the raw CSV url.
- "**View Cached Analysis Data**" will show you the analysis that was performed on that data.

## Contact
The author, James Robert Perih, can be contacted via email, james@hotdang.ca, or phone, 306-580-9501.

## License
Copyright (c) 2017, 2018 James Robert Perih
```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
