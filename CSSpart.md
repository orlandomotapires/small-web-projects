# CSS Tags and others

[Back To Main README](./README.md).

&emsp;Here you will find many CSS tags, concepts and other things I judged important to write here.</br>

## Inline Style </br>

&emsp;When you put the style directly on the line </br>

![InlineStyleSheet](/assets/InlineStyleSheet.png)

## Internal Style Sheet

- Defining the style (normal) </br>
  
&emsp;That's when we use the Style inside the html, like this: </br>

![InternalStyleSheet](/assets/InternalStyleSheet.png)
  
- Defining the Style (classes)

&emsp;Classes are patterns that can be applied throughout code, like this: </br>

![InternalStyleSheet2](/assets/InternalStyleSheet2.png)

- Defining the Style (Id)

&emsp;Id is an identifier that is used to format the page, it is used in this way: (it is used only 1 time for each type that you are defining) </br>

![InlineStyleSheet3](/assets/InternalStyleSheet3.png)

### Div & Span Tags

&emsp;Div serves to place one below the other and Span serves to place one next to the other. </br>

- Div: </br>

![InlineStyleSheet4](/assets/InternalStyleSheet4.png)

- Span: </br>

![InlineStyleSheet5](/assets/InternalStyleSheet5.png)

- Edges:

``` HTML

    <!DOCTYPE html>
    <html lang="en">
        <head>
        
        <meta charset="UTF-8">
        <title>Borders</title>
        
        <style type="text/css">
        
            #content{
                /* border: 15px solid red; */
                border-color: black blue black blue;
                border-width: 40px 150px 129px 192px;
                border-style: groove double;
            }

        </style>

        </head>
        
        <body>
        
        <div id="content">
            Schettini <br>
        </div>

        <p>
            Content
        </p>

        </body>

    </html>

```

- Fonts and Colors </br>

``` HTML

    <style type="text/css">
        
        .formatting{
            color: rgba(241, 0, 0, 1);
            font-size: 100px;
            font-family: Ubuntu;
            background-color: blue;
        }

    </style>
    
    <body>
    <p class="formatting"> GABUROS </p>
    </body>

```

- External Style Sheet

&emsp;Use a CSS file to separate things </br>