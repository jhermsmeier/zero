# Kinematics

- **Forward Kinematics:** compute the position of the end-effector from specified values for the joint parameters
- **Inverse Kinematics:** determine the joint parameters that provide a desired position for each of the end-effectors

## Kinematics Equations

Equation for the series chain is a sequence of rigid transformations alternating joint and link transformations from the base of the chain to its end-link (or end-effector), which is equated to the specified position of the end-link:

<pre>
[T] = [Z<sub>1</sub>][X<sub>1</sub>][Z<sub>2</sub>][X<sub>2</sub>]...[X<sub>n-1</sub>][Z<sub>n</sub>]
</pre>

Where

- `[Z]` = rigid transformation of the joint's relative movement
- `[X]` = rigid transformation defining dimensions of each link
- `[T]` = transformation locating the end-link, or end-effector

+++

## Link Transformations

Convention for the definition of joint matrices `[Z]` and link matrices `[X]` in respect to the coordinate frame for spatial linkages:

Joint frame position consists of a screw displacement along the Z-axis:

<pre>
[Z<sub>i</sub>] = <em>Trans<sub>Z<sub>i</sub></sub></em>(d<sub>i</sub>) <em>Rot<sub>Z<sub>i</sub></sub></em>(θ<sub>i</sub>)
</pre>

Link frame position consists of the screw displacement along the X-axis:

<pre>
[X<sub>i</sub>] = <em>Trans<sub>X<sub>i</sub></sub></em>(a<sub>i,i+1</sub>) <em>Rot<sub>X<sub>i</sub></sub></em>(⍺<sub>i,i+1</sub>)
</pre>

Where θ<sub>i</sub>, d<sub>i</sub>, a<sub>i,i+1</sub>, and ⍺<sub>i,i+1</sub> are the **Denavit–Hartenberg parameters**

+++

## Denavit–Hartenberg Matrix

The matrices associated with these operations are for the **joint frame**:

<!--
$
Trans_{Z_i}(d_{i}) = \left( \begin{array}{r}
  1 & 0 & 0 & 0 \\
  0 & 1 & 0 & 0 \\
  0 & 0 & 1 & d_{i} \\
  0 & 0 & 0 & 1 \\
\end{array} \right)
$
-->

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>T</mi>
  <mi>r</mi>
  <mi>a</mi>
  <mi>n</mi>
  <msub>
    <mi>s</mi>
    <msub>
      <mi>Z</mi>
      <mi>i</mi>
    </msub>
  </msub>
  <mo stretchy="false">(</mo>
  <msub>
    <mi>d</mi>
    <mi>i</mi>
  </msub>
  <mo stretchy="false">)</mo>
  <mo>=</mo>
  <mrow>
    <mo>(</mo>
    <mtable columnalign="right" rowspacing="4pt" columnspacing="1em">
      <mtr>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <msub>
            <mi>d</mi>
            <mi>i</mi>
          </msub>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo>)</mo>
  </mrow>
</math>

<!--
$
Rot_{Z_i}(θ_{i}) = \left( \begin{array}{r}
  cos(θ_i) & -sin(θ_i) & 0 & 0 \\
  sin(θ_i) & cos(θ_i) & 0 & 0 \\
  0 & 0 & 1 & d_{i} \\
  0 & 0 & 0 & 1 \\
\end{array} \right)
$
-->

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>R</mi>
  <mi>o</mi>
  <msub>
    <mi>t</mi>
    <msub>
      <mi>Z</mi>
      <mi>i</mi>
    </msub>
  </msub>
  <mo stretchy="false">(</mo>
  <msub>
    <mo>&#x3B8;</mo>
    <mi>i</mi>
  </msub>
  <mo stretchy="false">)</mo>
  <mo>=</mo>
  <mrow>
    <mo>(</mo>
    <mtable columnalign="right" rowspacing="4pt" columnspacing="1em">
      <mtr>
        <mtd>
          <mi>c</mi>
          <mi>o</mi>
          <mi>s</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x3B8;</mo>
            <mi>i</mi>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mo>&#x2212;<!-- − --></mo>
          <mi>s</mi>
          <mi>i</mi>
          <mi>n</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x3B8;</mo>
            <mi>i</mi>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>s</mi>
          <mi>i</mi>
          <mi>n</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x3B8;</mo>
            <mi>i</mi>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mi>c</mi>
          <mi>o</mi>
          <mi>s</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x3B8;</mo>
            <mi>i</mi>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <msub>
            <mi>d</mi>
            <mi>i</mi>
          </msub>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo>)</mo>
  </mrow>
</math>

Similarly for the **link frame**:

<!--
$
Trans_{X_i}(a_{i,i+1}) = \left( \begin{array}{l}
  1 & 0 & 0 & a_{i,i+1} \\
  0 & 1 & 0 & 0 \\
  0 & 0 & 1 & 0 \\
  0 & 0 & 0 & 1 \\
\end{array} \right)
\\ 
Rot_{X_i}(⍺_{i,i+1}) = \left( \begin{array}{c}
 1 & 0 & 0 & 0 \\
 0 & cos(⍺_{i,i+1}) & -sin(⍺_{i,i+1}) & 0 \\
 0 & sin(⍺_{i,i+1}) & cos(⍺_{i,i+1}) & 0 \\
 0 & 0 & 0 & 1 \\
\end{array} \right)
$
-->

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>T</mi>
  <mi>r</mi>
  <mi>a</mi>
  <mi>n</mi>
  <msub>
    <mi>s</mi>
    <msub>
      <mi>X</mi>
      <mi>i</mi>
    </msub>
  </msub>
  <mo stretchy="false">(</mo>
  <msub>
    <mi>a</mi>
    <mrow>
      <mi>i</mi>
      <mo>,</mo>
      <mi>i</mi>
      <mo>+</mo>
      <mn>1</mn>
    </mrow>
  </msub>
  <mo stretchy="false">)</mo>
  <mo>=</mo>
  <mrow>
    <mo>(</mo>
    <mtable columnalign="right" columnspacing="1em" rowspacing="4pt">
      <mtr>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <msub>
            <mi>a</mi>
            <mrow>
              <mi>i</mi>
              <mo>,</mo>
              <mi>i</mi>
              <mo>+</mo>
              <mn>1</mn>
            </mrow>
          </msub>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo>)</mo>
  </mrow>
</math>

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>R</mi>
  <mi>o</mi>
  <msub>
    <mi>t</mi>
      <msub>
      <mi>X</mi>
      <mi>i</mi>
    </msub>
  </msub>
  <mo stretchy="false">(</mo>
  <msub>
      <mo>&#x237A;</mo>
    <mrow>
      <mi>i</mi>
      <mo>,</mo>
      <mi>i</mi>
      <mo>+</mo>
      <mn>1</mn>
    </mrow>
  </msub>
  <mo stretchy="false">)</mo>
  <mo>=</mo>
  <mrow>
    <mo>(</mo>
    <mtable columnalign="right" rowspacing="4pt" columnspacing="1em">
      <mtr>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mi>c</mi>
          <mi>o</mi>
          <mi>s</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x237A;</mo>
            <mrow>
              <mi>i</mi>
              <mo>,</mo>
              <mi>i</mi>
              <mo>+</mo>
              <mn>1</mn>
            </mrow>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mo>&#x2212;<!-- − --></mo>
          <mi>s</mi>
          <mi>i</mi>
          <mi>n</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x237A;</mo>
            <mrow>
              <mi>i</mi>
              <mo>,</mo>
              <mi>i</mi>
              <mo>+</mo>
              <mn>1</mn>
            </mrow>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mi>s</mi>
          <mi>i</mi>
          <mi>n</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x237A;</mo>
            <mrow>
              <mi>i</mi>
              <mo>,</mo>
              <mi>i</mi>
              <mo>+</mo>
              <mn>1</mn>
            </mrow>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mi>c</mi>
          <mi>o</mi>
          <mi>s</mi>
          <mo stretchy="false">(</mo>
          <msub>
            <mo>&#x237A;</mo>
            <mrow>
              <mi>i</mi>
              <mo>,</mo>
              <mi>i</mi>
              <mo>+</mo>
              <mn>1</mn>
            </mrow>
          </msub>
          <mo stretchy="false">)</mo>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>0</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo>)</mo>
  </mrow>
</math>

Which, by Denavit–Hartenberg convention, yields <code>[<sup>i-1</sup>T<sub>i</sub>]</code> – the link transformation matrix known as the **Denavit-Hartenberg matrix**:

<!--
$
[^{i-1}T_i] = \left( \begin{array}{r}
cos(θ_i) & -sin(θ_i) cos(⍺_{i,i+1}) &  sin(θ_i) sin(⍺_{i,i+1}) & a_{i,i+1} cos(θ_i) \\
sin(θ_i) & cos(θ_i) cos(⍺_{i,i+1}) &  -sin(θ_i) sin(⍺_{i,i+1}) & a_{i,i+1} sin(θ_i)  \\
0 & sin(⍺_{i,i+1}) & cos(⍺_{i,i+1}) & d_i \\
0 & 0 & 0 & 1
\end{array} \right) 
$
-->

<math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mo stretchy="false">[</mo><mrow><mi>i</mi><mo>&#x2212;</mo><mn>1</mn></mrow></msup><msub><mi>T</mi><mi>i</mi></msub><mo stretchy="false">]</mo><mo>=</mo><mrow><mo>(</mo><mtable columnalign="right" rowspacing="4pt" columnspacing="1em"><mtr><mtd><mi>c</mi><mi>o</mi><mi>s</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo></mtd><mtd><mo>&#x2212;</mo><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo><mi>c</mi><mi>o</mi><mi>s</mi><mo stretchy="false">(</mo><msub><mo>&#x237A;</mo><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo stretchy="false">)</mo></mtd><mtd><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x237A;</mo><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo stretchy="false">)</mo></mtd><mtd><msub><mi>a</mi><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mi>c</mi><mi>o</mi><mi>s</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo></mtd></mtr><mtr><mtd><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo></mtd><mtd><mi>c</mi><mi>o</mi><mi>s</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo><mi>c</mi><mi>o</mi><mi>s</mi><mo stretchy="false">(</mo><msub><mo>&#x237A;</mo><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo stretchy="false">)</mo></mtd><mtd><mo>&#x2212;</mo><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x237A;</mo><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo stretchy="false">)</mo></mtd><mtd><msub><mi>a</mi><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x3B8;</mo><mi>i</mi></msub><mo stretchy="false">)</mo></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><msub><mo>&#x237A;</mo><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo stretchy="false">)</mo></mtd><mtd><mi>c</mi><mi>o</mi><mi>s</mi><mo stretchy="false">(</mo><msub><mo>&#x237A;</mo><mrow><mi>i</mi><mo>,</mo><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo stretchy="false">)</mo></mtd><mtd><msub><mi>d</mi><mi>i</mi></msub></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow></math>

+++

## 