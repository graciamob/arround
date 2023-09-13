#!/usr/bin/python
#
#  Copyright 2017 Otto Seiskari
#  Licensed under the Apache License, Version 2.0.
#  See http://www.apache.org/licenses/LICENSE-2.0 for the full text.
#
#  This file is based on
#  https://github.com/swagger-api/swagger-ui/blob/4f1772f6544699bc748299bd65f7ae2112777abc/dist/index.html
#  (Copyright 2017 SmartBear Software, Licensed under Apache 2.0)
#
"""
Usage:

    python swagger-yaml-to-html.py < /path/to/api.yaml > doc.html

"""
import yaml, json, sys

TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.5.0/swagger-ui.css" >
</head>
<body>

<div id="swagger-ui"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.5.0/swagger-ui-bundle.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.5.0/swagger-ui-standalone-preset.js"></script>
<script>
window.onload = function() {

  let spec = %s;

  let str = JSON.stringify(spec);
  str = str.replaceAll('\u00c3\u00a9', 'é');
  str = str.replaceAll('\u00c3\u00a8', 'è');
  str = str.replaceAll('\u00c3\u00a7', 'ç');
  str = str.replaceAll('\u00c3\u00a0', 'à');
  str = str.replaceAll('\u00c3\u00a2', 'â');
  str = str.replaceAll('\u00c3\u2030', 'É');
  spec = JSON.parse(str);

  // Build a system
  window.ui = SwaggerUIBundle({
    spec: spec,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
}
</script>
</body>

</html>"""

spec = yaml.load(sys.stdin, Loader=yaml.FullLoader)
output = TEMPLATE % json.dumps(spec)
sys.stdout.write(output)

#remplacer \u00c3\u00a9 par é
#remplacer \u00c3\u00a8 par è
#remplacer \u00c3\u00a0 par à

#remplacer \u00c3\u2030 par É
