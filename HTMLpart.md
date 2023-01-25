# HTML Tags and others

[Back To Main README](./README.md).

&emsp;Here you will find many HTML tags, concepts and other things I judged important to write here.</br>

<details>
<summary> <strong> Title </strong> </summary>

&emsp;Text level (Title, subtitle, subsubtitle): h1, h2, h3... </br>

```HTML
<h1> Text level 1 </h1> 
<h2> Text level 2 </h2>
<h3> Text level 3 </h3>
<h4> Text level 4 </h4>
<h5> Text level 5 </h5>
<h6> Text level 6 </h6>
```

</details>

<details>
<summary> <strong> Paragraph </strong> </summary>

&emsp;p: tag to create a paragraph </br>

```HTML
<p> Just plain text </p> 
```

</details>

<details>
<summary> <strong> Lists </strong> </summary>

- **li:** List items
- **Ul:** Unordered list

```HTML
<ul> 

    <li> HTML </li>
    <li> CSS </li>
    <li> JavaScript </li>

</ul>
```

- **ol:** Sorted list

```HTML
<ol> 
<li> HTML </li>
<li> CSS </li>
<li> JavaScript </li>

</ol>
```

</details>

<details>
<summary> <strong> HyperLink </strong> </summary>

&emsp;a: anchor(tag to link one page to another)</br>

```HTML
<a href= "https://www.google.com/">AnyPage</a>
```

</details>

<details>
<summary> <strong> Image </strong>  </summary>

&emsp;img: Place an image </br>
&emsp;figure: Make the browser give greater importance to that image</br>

```HTML
<figure>
    <a href= "https://www.google.com/">AnyPage</a>
    <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>
```

</details>

<details>
<summary> <strong> Tables </strong>  </summary>

&emsp;tr: Table Row </br>
&emsp;th: Table Header</br>
&emsp;td: Table Data</br>

```HTML
<table border = "EDGE THICKNESS"> 

</table>
```

</details>

<details>
<summary> <strong> Forms </strong>  </summary>

```HTML
<form>
      
      Login: <br>
      <input type="text" name="login"><br>
    
      Password: <br>
      <input type="password" name="password"><br>
    
      <input type="submit" value="Login"><br>
    
    </form>

    <h2>Register</h2>
  
    <form>
      Login: <br>
      <input type="text" name="login"><br>

      <br>

      Gender: <br>
      <input type="radio" name="sex" value="M"> Male <br>
      <input type="radio" name="sex" value="F"> Female <br>

      <br>

      Interests: <br>
      <input type="checkbox" name="interest" value="Football">Football <br>
      <input type="checkbox" name="interest" value="Basketball">Basketball <br>
      <input type="checkbox" name="interest" value="Volleyball"> Volleyball <br>

      <br>

      Status: <br>
      <select>
        <option value="sp">SP</option>
        <option value="ba">BA</option>
        <option value="rj">RJ</option>
      </select><br><br>

      Notes: <br>
      <textarea name="notes" rows="4" cols="50"></textarea> <br> <br>
      <input type="submit" value="Submit">
    
    </form>
```

</details>

<details>
<summary> <strong> Special Characters </strong>  </summary>

&emsp;<, >, , / , all special characters have codes for them (like an ASCII table)</br>

</details>

<details>
<summary> <strong> Division of content and semantics </strong>  </summary>

&emsp;**main**: responsible for storing the main content of the page (main) </br>
&emsp;**section**: a section to better organize the code (contents that talk about different contents are in different sections)</br>
&emsp;**header**: header (up there in the main bar)</br>
&emsp;**footer**: footer (it's down there in the bottom bar)</br>
&emsp;**div**: more generic content division tag (used to organize, separate things logically)</br>

```HTML
<main> </main>
<section> </section>
<header> </header>
<footer> </footer>
<div></div>
```

</details>
