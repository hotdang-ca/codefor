# Data Analysis Demo App
The following app is written in **express** and **node**, with **pug** for a template engine, and **PapaParse** for data parsing, for the demonstration purposes only.

## Instructions
Unzip the package (you’ve already done this), and provided that you have node and nom installed, you can simply run `npm install` in the resulting folder from the command line, followed by `npm start`.

If you’d like to specify a different csv source file, provide this as an additional parameter, e.g., `npm start http://path.to/file.csv`

If you do not have access to Node or Npm, please [contact me](mailto:james@hotdang.ca); I will supply a demo site where you can view the app.

## Notes
While I could have provided an analysis of all categories at once, I took the (quicker) approach of allowing the user to browse a cached copy of the raw data, and clicking on a category to get the analysis. This analysis is performed the first time a category is selected, and cached; resulting requests in that data will return the cached analysis.
It would be a simple effort to provide a full analysis of all unique categories; you can access the currently-accumulated analysis data by browsing to http://localhost:3000/api/analyze/all.

## Contact
The author, James Robert Perih, can be contacted via email, james@hotdang.ca, or phone, 204-995-9502.

## License
Copyright (c) 2017 James Robert Perih
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
