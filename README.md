# TL-Elections - Transparent Logs for data transparency
Merkle tree-based system to improve transparency and auditability of data.

## Overview

This prototype is applied to the Brazilian election. It transparently stores the "Boletins de Urna" (the result of the votes recorded in the ballot box) and allows their integrity to be verified.

* Publication in SBSeg 2022 ([Article](https://sol.sbc.org.br/index.php/sbseg_estendido/article/view/21696/21520)) ([Video](https://youtu.be/gRLXQXpbc5s "SBSeg"))


## Setup
Instructions for installation and use [here](./install.md).


## Functionalities

<b>Consult and Verify a BU</b>

Allows the user to find the desired BU, select it, and access additional information about it (e.g., votes recorded).

It is also possible to make your proof of inclusion, verifying its integrity. The result is evidenced by the images below:

<center>

| Valid Proof | Invalid Proof |
| :-------------: |:-------------:|
|![cad-verde](https://user-images.githubusercontent.com/77642873/180626237-60dc5438-43f3-436a-8374-c0d685b5d4a6.png)|![cad-vermelho](https://user-images.githubusercontent.com/77642873/180626247-1b7bfdee-68e1-4130-84de-d566fe12fafe.png)|

</center>   

![bu_verificar](https://user-images.githubusercontent.com/28439483/182242126-3c9efccb-c449-413d-8b38-ccbb552bec15.png)

<b> Tree history </b>

Allows monitors to perform consistency checks on the Merkle Tree, thereby monitoring changes at the root of the tree.

When clicking on "Verify integrity", the application will validate all consistency tests published by the backend.

If the color of the lines turns green, the evidence is consistent. If red, they are not.

![Histórico da árvore](https://user-images.githubusercontent.com/77642873/219463486-38a39714-b0ec-4205-9c09-1e8f5fd32278.png)
