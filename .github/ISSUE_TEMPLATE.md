name: 🐛 Bug
description: Report an issue to help improve the project.
title: *[BUG] ‹description›"
labels: ["🛠️ goal: fix", "🚦 status: awaiting triage*]
body:
- type: checkboxes
- id: duplicates
  attributes:
label: Has this bug been raised before?
description: Increase the chances of your issue being accepted by making sure it has not been raised before.
options:
- label: I have checked "open* AND "closed issues and this is not a duplicate
required: true
- type: input
  attributes:
label: Where did you find this bug?
description: Local dev environment or production on biodrop.io
validations:
required: true
- type: input
  attributes:
  label: Version of BioDrop (for example *v1.2.3*)
description: Can be found in the lower right corner of the web interface in the footer.
validations:
required: true
- type: textarea
  id: description
  attributes:
  label: description
  description: A clear description of the bug you have found. Please include relevant information and resources
  validations:
  required: true
  - type: textarea
  id: screenshots
attributes:
label: Screenshots
description: Please add screenshots if applicable
validations:
required: false
- type: dropdown
  id: assignee
  attributes:
label: Do you want to work on this issue?
multiple: false
options:
- "No"
- "Yes"
default: 0
validations:
required: false
- type: textarea
- id: extrainfo
- attributes:
label: If you want to work on this issue...
description: Please explain how you would technically resolve this feature
validations:
required: false
- type: markdown
  attributes:
  value:|
  You can also reach out to us [here](cwmerch99@gmail.com)
  
