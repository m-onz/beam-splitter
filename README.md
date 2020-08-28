# `beam-splitter`

<img src="splitter.png" />

cli tool that encrypts a file &amp; splits it into chunks, also re-assembles chunks using a password.
This is useful for me and designed to work on a specific (and quite low) version of node.
Comments, PRs and suggestions are welcome.

## `usage`

```
beam-splitter --export demo.zip --password pass
beam-splitter --import ./demo.zip_output --password pass
```

## `how does it work?`

#### `exporting`

You supply a password, the file is encrypted using node built in streaming crypto API and
 the blowfish algorithm. The encrypted blob is then split into 1MB chunks and put into a folder
  using the .png extension so it appears to be a folder of seemingly broken images.

#### `importing`

You supply a folder and password and it re-assembles the file and decrypts it.

## `example output`

```
beam-splitter :: importing  .\demo.zip_output\
<chunk>  06abb373fceabd07ef21f5113836f5e2d095fd5749fe026c8216c2295359530a
<chunk>  0efea96c17ae7dd9522c8a502bc4dbae6f1afe6800d6ac51138ff6f76d6d1768
<chunk>  10c6c78d5d4c37579bf84d43da4b059c26fee8ca24e44059d298489c80f7dff8
<chunk>  128fbd1265bf5111ad527e3dfc1b6f8f659da542026ea9fdc2ee4124630644fb
<chunk>  1cba4e3b2ffc1648b86e873b7a5910f129043fb2016e9e548ee9ef41d32711b9
<chunk>  1d6344a28fb8b42edc824b09265967b492b19f3bc65519607a3e8dc4b8c0908e
<chunk>  267e8ec0339cdebfa924b0386706646bf9dee23b01a0928770527a0d969f75ae
<chunk>  26aae24a4318de4b5aa482f9e5e7a5e1968250bc1e67587d477270555b9c399e
<chunk>  296e9763c246c6e378b3b1f12bc4f50887bcacec9225f099c14f0ef4ad35e20e
<chunk>  353b52b80b3aca68cc053a1979e7d5270cecf5ceff93c03386031f1ef9682b79
<chunk>  3f14f38077dff9a51230f3153aae0fc1e5e70f10db378750b6695c55647d4b91
<chunk>  4cd6f04c023372d82d1a393404c4d426358066b3c1f950c784a126d37fd3fb61
<chunk>  5f034213232d145c2e384cf784688b11932675a882765972653d4fa0851429ba
<chunk>  6b116b994de165b79767781936837e11089db0ce27b141172866973011da3527
<chunk>  6c8222043c7e29d45280dd373daf43f27733d62966583ed160e59a09946b145d
<chunk>  720e1e459223c1805f11a90243dbeef1e1b83d1ade90b32c04d049057f0cd287
<chunk>  734bde078123650550ce11dbcabd892a2c5562704d6ac390ca7a9712773a0c93
<chunk>  83870bea06d481bbf65604c4b40176e3dd210d22a1b07d70a735ca9c3d05bcd8
<chunk>  93abe1db15a8e57933c9df00c2c0067bdd38f0a8541b63a69f9da475bcc119ce
<chunk>  94649b2f7ed5b818b74941abfd6ff0b32cf30555aaee0c44889560e8b481b1b0
<chunk>  984d196f043d145a2fefaf89bc92ea31f7d88d253361999bba2a8c38fa599caa
<chunk>  a63bfe23eaad16e5a1c51fae4d1494031d9e5b5e0ea1b7932e754b4db40f5ad8
<chunk>  afb5ac1b13cea22397cbc5930fb8773f7d477b8ec74ff230ebb4a4c8f27b404e
<chunk>  b1ffdc6dc491748c27a2ad40b872fac347577e21f4fcd201070abd68aad58d99
<chunk>  b70014cb3511cf6cb893ccab3af47e639995804e257c7b3db32a3352db2b50f0
<chunk>  bb790aac9734ca8f08142b847734b011f8f621f85c8560dfd1d14987271949b0
<chunk>  c2ef78822fc2082487463b2bd983030838ed149e1a0d36dec89b0a48181413b7
<chunk>  c8bd3f9e81f07e06274f83c54d7c87c88cc32d370b1bff3f20a19f0cdff12938
<chunk>  cb80ab80a1ec76b01a9689120778a999c4f0bb1d2463f421cfdf0751fcf2ddf2
<chunk>  d7772fb2bdac4061be4489bcac5d44515715b965916fddeeabee1ca1395c7f13
<chunk>  d944c75b1c69ed4f1daf8e4408238f219dda1f23a00986c95ea79cd16e1d5c06
<chunk>  da130e5f0b7b289c54988c1fef23174640bebc3022293fd115191f045704d204
<chunk>  db2c26113a1f70e00bc276162e93849b5f8f083f3817974439fd6e0fa0564351
<chunk>  f0da6dd7aabf0208c77d97658a22bc652969f76cfb684f87494e8f06848d129c
35286840 ........
(node:5028) [DEP0106] DeprecationWarning: crypto.createDecipher is deprecated.
```

## `install`
```
npm i @yaus/beam-splitter -g
```
