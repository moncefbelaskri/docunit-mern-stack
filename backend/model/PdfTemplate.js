module.exports=({nom,prénom,da,li,ad,nt,email,an,seb,nb,sdd,dad,dap,sd,lr,dn,dp,dg,cdn,cdp,cdg,intit,etv,pctv,datesou,dep,ep,pr,cd,dd,prr}) =>{
   return `
   <!DOCTYPE HTML>
<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
<div style="position:absolute;top:10.95in;left:0.64in;width:7.74in;line-height:0.17in;">
<span style="font-style:italic;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
NB :
</span>
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Garamond;color:#000000">
-La fiche doit être remplie par micro-ordinateur et imprimé sur une seule feuille (recto/verso).
</span>
<br/>
</div>
<div style="position:absolute;top:11.15in;left:1.02in;width:7.65in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Garamond;color:#000000">
-Toute fiche remplie au stylo sera rejetée et l’attestation de réinscription ne sera pas délivrée.
</span>
<br/>
</div>
<div style="position:absolute;top:11.30in;left:1.56in;width:5.73in;line-height:0.13in;">
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
Faculté des Sciences - Tidjani HADDAM :
</span>
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
Tél : 043 21 63 70 / Tél &amp;Fax : 043 21 63 68 / 043 21 63 71
</span>
<br/>
</div>
<div style="position:absolute;top:11.45in;left:2.20in;width:4.19in;line-height:0.13in;">
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
Site Web: www.fs.univ-tlemcen.dz</span>
<a href="http://www.fs.univ-tlemcen.dz/">
</a>
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
/    Email: vdrpg.facscience@gmail.com
</span>
<br/>
</div>
<div style="position:absolute;top:1.28in;left:2.38in;width:4.28in;line-height:0.19in;">
<span style="font-style:italic;font-weight:bold;font-size:14pt;font-family:Times New Roman;color:#000000">
DEPARTEMENT DE 
</span>
<span style="font-style:normal;font-weight:bold;font-size:14pt;font-family:Times New Roman;color:#000000">
:
</span>
<span style="font-style:normal;font-weight:bold;font-size:14pt;font-family:Times New Roman;color:#000000">

${dep==="math"?
"Mathématique":
""
}
${dep==="phy"?
"Physique":
""
}
${dep==="chi"?
"Chimie":
""
}
${dep==="info"?
"Informatique":
""
}
</span>
<br/>
</div>
<div style="position:absolute;top:1.61in;left:2.75in;width:3.63in;line-height:0.22in;">
<span style="font-style:italic;font-weight:bold;font-size:16pt;font-family:Times New Roman;color:#000000">
FICHE DE REINSCRIPTION EN 
</span>
<br/>
</div>


<div style="position:absolute;top:1.89in;left:1.70in;width:5.94in;line-height:0.22in;">
<span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Times New Roman;color:#000000">
${cd==="sci"? 
"■"
:
"□"
}
</span>
<span style="font-style:italic;font-weight:bold;font-size:16pt;font-family:Times New Roman;color:#000000">
DOCTORAT EN SCIENCES
</span>
</div>
<div style="position:absolute;top:1.89in;left:5.06in;width:5.94in;line-height:0.22in;">
<span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Times New Roman;color:#000000">
${cd==="lmd"? 
"■"
:
"□"
}
</span>
<span style="font-style:italic;font-weight:bold;font-size:16pt;font-family:Times New Roman;color:#000000">
DOCTORAT LMD
</span>
<br/>
</div>
<img style="position:absolute;top:1.58in;left:0.53in;width:7.19in;height:0.56in" src="ci_9.png" />

<div style="position:absolute;top:2.25in;left:3.01in;width:3.10in;line-height:0.19in;">
<span style="font-style:italic;font-weight:bold;font-size:14pt;font-family:Times New Roman;color:#000000">
Année Universitaire : 2021 – 2022 
</span>
<br/>
</div>
<div style="position:absolute;top:2.52in;left:4.06in;width:0.13in;line-height:0.19in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Symbol;color:#000000">

</span>
<br/>
</div>
<div style="position:absolute;top:2.54in;left:4.34in;width:1.20in;line-height:0.16in;">
<span style="font-style:italic;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
DOCTORANT
</span>
<br/>
</div>
<div style="position:absolute;top:2.78in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:2.78in;left:1.18in;width:3.58in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Nom : 
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${nom}
</span>
<br/>
</div>
<div style="position:absolute;top:2.78in;left:3.86in;width:3.92in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Prénom :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${prénom}
</span>
<br/>
</div>
<div style="position:absolute;top:3.02in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:3.02in;left:1.18in;width:3.74in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Né(e) le :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${da}
</span>
<br/>
</div>
<div style="position:absolute;top:3.02in;left:3.86in;width:3.79in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
           à :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${li}
</span>
<br/>
</div>
<div style="position:absolute;top:3.26in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:3.26in;left:1.18in;width:7.27in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Adresse :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${ad}
</span>
<br/>
</div>
<div style="position:absolute;top:3.50in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:3.50in;left:1.18in;width:3.65in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
N° de téléphone :   
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${nt}
</span>
</div>
<div style="position:absolute;top:3.50in;left:4.86in;width:3.65in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Email :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${email}
</span>
<br/>
</div>
<div style="position:absolute;top:3.74in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:3.74in;left:1.18in;width:6.52in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
   Salarié(e)
   ${ep==="sal"? 
"⚫"
:
"⚪"
}
</span>
</div>
<div style="position:absolute;top:3.74in;left:2.58in;width:6.52in;line-height:0.16in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
   (Préciser): 
   ${ep==="sal"? 
pr
:
""
}
</span>
</div>
<div style="position:absolute;top:3.74in;left:6.08in;width:6.52in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Non salarié(e) 
${ep==="nonsal"? 
"⚫"
:
"⚪"
}
</span>
<br/>
</div>
<div style="position:absolute;top:3.98in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:3.98in;left:1.18in;width:4.45in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Année d’obtention du BAC :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${an}
</span>
</div>
<div style="position:absolute;top:3.98in;left:5.86in;width:3.45in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Série du BAC :
</span>  
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${seb}
</span>                     
<br/>
</div>
<div style="position:absolute;top:4.22in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:4.22in;left:1.18in;width:5.12in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
N° du BAC :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${nb}
</span>
<br/>
</div>
<div style="position:absolute;top:4.46in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:4.46in;left:1.18in;width:6.58in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Dernier diplôme obtenu :
</span>
<br/>
</div>
<div style="position:absolute;top:4.46in;left:3.50in;width:6.58in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
${dd==="mag"? 
"⚫"
:
"⚪"
}
Magister
</span>
<br/>
</div>
<div style="position:absolute;top:4.46in;left:4.68in;width:6.58in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
${dd==="mas"? 
"⚫"
:
"⚪"
}
Master
</span>
<br/>
</div>
<div style="position:absolute;top:4.46in;left:5.98in;width:6.58in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
${dd==="au"? 
"⚫"
:
"⚪"
}
Autre (Préciser): 
${dd==="au"? 
prr
:
""
}
</span>
<br/>
</div>
<div style="position:absolute;top:4.70in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:4.70in;left:1.18in;width:7.10in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Spécialité du Dernier diplôme obtenu :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${sdd}
</span>
<br/>
</div>
<div style="position:absolute;top:4.94in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:4.94in;left:1.18in;width:7.10in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Date d’obtention du Dernier Diplôme :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${dad}
</span>
<br/>
</div>
<div style="position:absolute;top:5.18in;left:0.92in;width:5.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:5.18in;left:1.18in;width:0.96in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Date de la 1
</span>
<br/>
</div>
<div style="position:absolute;top:5.17in;left:2.05in;width:0.19in;line-height:0.11in;">
<span style="font-style:normal;font-weight:bold;font-size:8pt;font-family:Times New Roman;color:#000000">
ère
</span>
<br/>
</div>
<div style="position:absolute;top:5.18in;left:2.26in;width:6.01in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Inscription en Doctorat :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${dap}
</span>
<br/>
</div>
<div style="position:absolute;top:5.42in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:5.42in;left:1.18in;width:6.88in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Spécialité du Doctorat :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${sd}
</span>
<br/>
</div>
<div style="position:absolute;top:5.67in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:5.67in;left:1.18in;width:6.45in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Laboratoire de rattachement :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${lr}
</span>
<br/>
</div>
<div style="position:absolute;top:6.03in;left:3.35in;width:0.13in;line-height:0.19in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Symbol;color:#000000">

</span>
<br/>
</div>
<div style="position:absolute;top:6.05in;left:3.60in;width:2.04in;line-height:0.16in;">
<span style="font-style:italic;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
DIRECTEUR DE THESE
</span>
<br/>
</div>
<div style="position:absolute;top:6.27in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:6.27in;left:1.18in;width:3.00in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Nom :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${dn}
</span>
<br/>
</div>
<div style="position:absolute;top:6.27in;left:3.33in;width:3.33in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Prénom :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${dp}
</span>
<br/>
</div>
<div style="position:absolute;top:6.55in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:6.55in;left:1.18in;width:3.00in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Grade :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${dg}
</span>
<br/>
</div>
<div style="position:absolute;top:6.55in;left:3.33in;width:3.51in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Etablissement d’origine :
</span>
<br/>
</div>
<div style="position:absolute;top:6.80in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:6.80in;left:1.18in;width:5.45in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Laboratoire de rattachement :
</span>
<br/>
</div>
<div style="position:absolute;top:7.05in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">-
</span>
<br/>
</div>
<div style="position:absolute;top:7.05in;left:1.18in;width:3.65in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
N° de téléphone :  
</span>
</div>
<div style="position:absolute;top:7.05in;left:4.50in;width:3.65in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Email :
</span>
<br/>
</div>
<div style="position:absolute;top:7.30in;left:3.15in;width:0.13in;line-height:0.19in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Symbol;color:#000000">

</span>
<br/>
</div>
<div style="position:absolute;top:7.32in;left:3.40in;width:2.40in;line-height:0.16in;">
<span style="font-style:italic;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
CO - DIRECTEUR DE THESE
</span>
<br/>
</div>
<div style="position:absolute;top:7.54in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:7.54in;left:1.18in;width:3.00in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Nom :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${cdn}
</span>
<br/>
</div>
<div style="position:absolute;top:7.54in;left:3.33in;width:4.24in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Prénom :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${cdp}
</span>
<br/>
</div>
<div style="position:absolute;top:7.82in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:7.80in;left:1.18in;width:3.65in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Grade :
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${cdg}
</span>
<br/>
</div>
<div style="position:absolute;top:7.80in;left:3.33in;width:3.42in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">       
- Etablissement d’origine :
</span>
<br/>
</div>
<div style="position:absolute;top:8.06in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:8.06in;left:1.18in;width:5.45in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Laboratoire de rattachement :
</span>
<br/>
</div>
<div style="position:absolute;top:8.32in;left:0.92in;width:0.11in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
-
</span>
<br/>
</div>
<div style="position:absolute;top:8.32in;left:1.18in;width:4.65in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
N° de téléphone :
</span>
</div>
<div style="position:absolute;top:8.32in;left:4.50in;width:4.65in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
- Email :
</span>
<br/>
</div>
<div style="position:absolute;top:8.57in;left:3.30in;width:0.13in;line-height:0.19in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Symbol;color:#000000">

</span>
<br/>
</div>
<div style="position:absolute;top:8.57in;left:3.55in;width:2.17in;line-height:0.16in;">
<span style="font-style:italic;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
INTITULE DE LA THESE 
</span>
<br/>
</div>
<div style="position:absolute;top:9.07in;left:3.48in;width:3.00in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${intit}
</span>
<br/>
</div>
<img style="position:absolute;top:8.80in;left:0.53in;width:7.19in;height:0.70in"  />

<div style="position:absolute;top:9.60in;left:0.75in;width:2.32in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Times New Roman;color:#000000">
Date et Signature du Doctorant 
</span>
<br/>
</div>
<div style="position:absolute;top:9.60in;left:4.73in;width:4.87in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Times New Roman;color:#000000">
Date et Signature du Directeur de Thèse
</span>
<br/>
</div>

<div style="position:absolute;top:10.24in;left:2.82in;width:3.16in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Times New Roman;color:#000000">
Date et Signature du Co-Directeur de Thèse
</span>
<br/>
</div>


<div style="position:absolute;top:0.24in;left:0.47in;width:3.45in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Times New Roman;color:#000000">
République Algérienne Démocratique et Populaire
</span>
<br/>
</div>
<div style="position:absolute;top:0.40in;left:0.47in;width:4.14in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:9pt;font-family:Times New Roman;color:#000000">
Ministère de l’Enseignement Supérieur et de la Recherche Scientifique
</span>
<br/>
</div>
<div style="position:absolute;top:0.55in;left:0.47in;width:2.78in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Times New Roman;color:#000000">
Université Aboubekr BELKAID – TLEMCEN 
</span>
<br/>
</div>
<div style="position:absolute;top:0.70in;left:0.47in;width:2.32in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:9pt;font-family:Times New Roman;color:#000000">
Faculté des Sciences – Tidjani Haddam
</span>
<br/>
</div>
<div style="position:absolute;top:0.85in;left:0.47in;width:4.00in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:7.8pt;font-family:Times New Roman;color:#000000">
Service de la Post Graduation et de la Recherche Scientifique et des Relations Extérieures
</span>
<br/>
</div>

<div style="position:absolute;top:0.30in;right:0.13in;width:2.34in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Times New Roman;color:#000000">
الجمهورية الجزائرية الديمقراطية الشعبية
</span>
<br/>
</div>
<div style="position:absolute;top:0.49in;right:0.09in;width:2.20in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
وزارة التعليم العالي و البحث العلمي
</span>
<br/>
</div>
<div style="position:absolute;top:0.68in;right:0.04in;width:1.60in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Times New Roman;color:#000000">
جامعة أبو بكر بلقايد- تلمسان
</span>
<br/>
</div>
<div style="position:absolute;top:0.85in;right:-0.09in;width:1.60in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Times New Roman;color:#000000">
كلية العلوم – تيجاني هدام
</span>
<br/>
</div>
<div style="position:absolute;top:1.02in;right:0.23in;width:2.26in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:8pt;font-family:Times New Roman;color:#000000">
مصلحة ما بعد التدرج البحث العلمي والعلا قات الخارجية
</span>
<br/>
</div>
<img style="position:absolute;top:0.24in;left:4.63in;width:0.98in;height:0.95in" src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Logo-Univ_Tlemcen.png" />

<div style="position:absolute;top:12.38in;left:0.64in;width:2.21in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
ETAT D’AVANCEMENT :
</span>
</div>
<div style="position:absolute;top:12.80in;left:0.90in;width:6.00in;line-height:0.17in;">
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${etv}
</span>
<br/>
</div>
<img style="position:absolute;top:12.22in;left:0.53in;width:7.19in;height:5.70in" />

<div style="position:absolute;top:18.26in;left:0.64in;width:8.26in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
* Pourcentage d’avancement :
</span>
 <span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
 ${pctv}
 </span>
 </div>
<div style="position:absolute;top:18.26in;left:4.24in;width:8.26in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
* Date prévue de soutenance :   
</span>
<span style="font-style:normal;font-weight:normal;font-size:12pt;font-family:Times New Roman;color:#000000">
${datesou}
</span>
</div>
<img style="position:absolute;top:18.06in;left:0.53in;width:7.19in;height:0.60in"  />


<img style="position:absolute;top:19.06in;left:0.73in;width:3.39in;height:1.50in"  />
<img style="position:absolute;top:19.06in;left:4.12in;width:3.39in;height:1.50in"  />
<img style="position:absolute;top:20.56in;left:0.73in;width:3.39in;height:1.50in"  />
<img style="position:absolute;top:20.56in;left:4.12in;width:3.39in;height:1.50in"  />


<div style="position:absolute;top:19.16in;left:1.62in;width:1.81in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
*Avis et Visa du C.F.D
</span>
</div>
<div style="position:absolute;top:19.99in;left:0.83in;width:0.93in;line-height:0.17in;">
<span style="font-style:italic;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
NB :
</span>
</div>
<div style="position:absolute;top:19.99in;left:1.30in;width:8.93in;line-height:0.14in;">
<span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Times New Roman;color:#000000">
*Avis et visa du CFD : sont demandés
</span>
</div>
<div style="position:absolute;top:20.16in;left:0.83in;width:8.93in;line-height:0.14in;">
<span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Times New Roman;color:#000000">
uniquement pour les doctorants inscrits en Doctorat 
</span>
</div>
<div style="position:absolute;top:20.33in;left:0.83in;width:0.93in;line-height:0.14in;">
<span style="font-style:normal;font-weight:bold;font-size:10pt;font-family:Times New Roman;color:#000000">
LMD.
</span>
</div>

<div style="position:absolute;top:19.16in;left:5.00in;width:1.81in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Avis et Visa du C.S.D
</span>
</div>

<div style="position:absolute;top:20.66in;left:1.62in;width:1.81in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Avis et Visa du C.S.F
</span>
</div>

<div style="position:absolute;top:20.66in;left:5.00in;width:1.81in;line-height:0.16in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
Avis et Visa du Doyen
</span>
</div>









<div style="position:absolute;top:22.60in;left:0.64in;width:7.74in;line-height:0.17in;">
<span style="font-style:italic;font-weight:bold;font-size:12pt;font-family:Times New Roman;color:#000000">
NB :
</span>
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Garamond;color:#000000">
-La fiche doit être remplie par micro-ordinateur et imprimé sur une seule feuille (recto/verso).
</span>
<br/>
</div>
<div style="position:absolute;top:22.80in;left:1.02in;width:7.65in;line-height:0.17in;">
<span style="font-style:normal;font-weight:bold;font-size:12pt;font-family:Garamond;color:#000000">
-Toute fiche remplie au stylo sera rejetée et l’attestation de réinscription ne sera pas délivrée.
</span>
<br/>
</div>
<div style="position:absolute;top:22.95in;left:1.56in;width:5.73in;line-height:0.13in;">
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
Faculté des Sciences - Tidjani HADDAM :
</span>
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
Tél : 043 21 63 70 / Tél &amp;Fax : 043 21 63 68 / 043 21 63 71
</span>
<br/>
</div>
<div style="position:absolute;top:23.10in;left:2.20in;width:4.19in;line-height:0.13in;">
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
Site Web: www.fs.univ-tlemcen.dz</span>
<a href="http://www.fs.univ-tlemcen.dz/">
</a>
<span style="font-style:italic;font-weight:normal;font-size:9pt;font-family:Times New Roman;color:#000000">
/    Email: vdrpg.facscience@gmail.com
</span>
<br/>
</div>



</body>
</html>

`;
};