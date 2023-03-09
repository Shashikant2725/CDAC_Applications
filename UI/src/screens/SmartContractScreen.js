import React, { useState } from 'react'
import JSZip from "jszip";
import saveAs from "file-saver";
//import FileBase64 from "react-file-base64";
import { TiDelete } from "react-icons/ti";

import Header from '../components/Header';

const SmartContractScreen = (props) => {
  const [template, setTemplate] = useState('')
  const [stake, setStake] = useState('')
  const [func, setFunc] = useState('')
  let [arr, setArr] = useState([])

  function setFunction(val) {
    setFunc(val)
    console.log("val is ",val)
    document.getElementById('exampleFormControlTextarea1').disabled = true
    if (val === "RecordProofOfExistence"){
      document.getElementById('exampleFormControlTextarea1').value =
      'Sample Code For ' + function1
    }
    if (val === "QueryProofOfExistence"){
      document.getElementById('exampleFormControlTextarea1').value =
      'Sample Code For ' + function2
    }
    if (val === "QueryProofOfExByTxid"){
      document.getElementById('exampleFormControlTextarea1').value =
      'Sample Code For ' + function3
    }
    
  }

  let jsonFile = "ewogICJuYW1lIjogImNkYWNwb2UiLAogICJ2ZXJzaW9uIjogIjEuMC4wIiwKICAiZGVzY3JpcHRpb24iOiAicHJvb2Ygb2YgZXhpc3RlbmNlIGNoYWluY29kZSIsCiAgIm1haW4iOiAicG9lLWNoYWluY29kZS5qcyIsCiAgImVuZ2luZXMiOiB7CiAgICAibm9kZSI6ICI+PTguNC4wIiwKICAgICJucG0iOiAiPj01LjMuMCIKICB9LAogICJzY3JpcHRzIjogewogICAgInRlc3QiOiAibnBtIHRlc3QiLAogICAgInN0YXJ0IjogIm5vZGUgcG9lLWNoYWluY29kZS5qcyIKICB9LAogICJrZXl3b3JkcyI6IFsKICAgICJwb2UiLAogICAgImNoYWluY29kZSIKICBdLAogICJhdXRob3IiOiAiU2FuZGVlcCBSb21hbmEgKHNhbmRlZXByQGNkYWMuaW4pIiwKICAibGljZW5zZSI6ICJJU0MiLAogICJkZXBlbmRlbmNpZXMiOiB7CiAgICAiZmFicmljLXNoaW0iOiAifjIuMiIsCiAgICAidmFsaWQtZmlsZW5hbWUiOiAiXjIuMC4xIiwKICAgICJ2YWxpZGF0b3IiOiAiXjEwLjQuMCIKICB9Cn0K";
  let poeFile = "LyoKQ2hhaW5jb2RlIGZvciBQcm9vZiBvZiBFeGlzdGVuY2UuCkF1dGhvcjogU2FuZGVlcCBSb21hbmEgKHNhbmRlZXByQGNkYWMuaW4pCkRhdGU6IDI1LTA2LTIwMTgKQ29kZSBiYXNlZCBvbiBzYW1wbGUgY2hhaW5jb2RlcyBmcm9tIGh5cGVybGVkZ2VyIGZhYnJpYy1zYW1wbGVzIHJlcG8gYW5kIHBtcy1jaGFpbmNvZGUgZm9yIHByb3BlcnR5IG1hbmFnZW1lbnQgc3lzdGVtLgpDb3B5cmlnaHQoUikgLSAyMDE4LCBDZW50ZXIgRm9yIERldmVsb3BtZW50IG9mIEFkdmFuY2VkIENvbXB1dGluZy4gSHlkZXJhYmFkLgpQT0UgVkVSU0lPTiAyLjAKKi8KCmNvbnN0IHNoaW0gPSByZXF1aXJlKCdmYWJyaWMtc2hpbScpOwpjb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpOwpjb25zdCBDbGllbnRJZGVudGl0eSA9IHJlcXVpcmUoJ2ZhYnJpYy1zaGltJykuQ2xpZW50SWRlbnRpdHk7IC8vIGFjY2VzcyBjb250cm9sIG1vZHVsZQp2YXIgdmFsaWRhdG9yID0gcmVxdWlyZSgndmFsaWRhdG9yJyk7CmNvbnN0IHZhbGlkRmlsZW5hbWUgPSByZXF1aXJlKCd2YWxpZC1maWxlbmFtZScpOwoKbGV0IENoYWluY29kZSA9IGNsYXNzIHsKCiAgICAvLyBpbml0aWFsaXplIHRoZSBjaGFpbmNvZGUKICAgIGFzeW5jIEluaXQoc3R1Yil7CiAgICAgICAgY29uc29sZS5pbmZvKCc9PT09PT09PT09PSBJbnN0YW50aWF0ZWQgcHJvb2Ygb2YgZXhpc3RlbmNlIGNoYWluY29kZSA9PT09PT09PT09PScpOwogICAgICAgIHJldHVybiBzaGltLnN1Y2Nlc3MoKTsKICAgIH0KCiAgICAvKiBXaWxsIGludm9rZSBhIHNwZWNpZmljIGZ1bmN0aW9uIHJlcXVlc3RlZCBieSB0aGUgdXNlci4gQWxsIHRoZSBzdXBwb3J0ZWQgZnVuY3Rpb25zIGNhbiBiZSBpbnZva2VkIGZyb20gaGVyZS4qLwogICAgLypBY2Nlc3MgQ29udHJvbDogTm9uZSovCiAgICBhc3luYyBJbnZva2Uoc3R1Yil7CgogICAgICAgIGNvbnNvbGUuaW5mbygnPT09PT09PT09PT0gSW52b2tpbmcgdGhlIHJlcXVlc3RlZCBmdW5jdGlvbmFsaXR5ID09PT09PT09PT09Jyk7CiAgICAgICAgCiAgICAgICAgbGV0IHJldCA9IHN0dWIuZ2V0RnVuY3Rpb25BbmRQYXJhbWV0ZXJzKCk7CiAgICAgICAgCiAgICAgICAgY29uc29sZS5pbmZvKHJldCk7CgogICAgICAgIGxldCBtZXRob2QgPSB0aGlzW3JldC5mY25dOwogICAgCiAgICAgICAgaWYgKCFtZXRob2QpIHsKICAgICAgICAgICAgY29uc29sZS5lcnJvcignbm8gZnVuY3Rpb24gb2YgbmFtZTonICsgcmV0LmZjbiArICcgZm91bmQnKTsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWNlaXZlZCB1bmtub3duIGZ1bmN0aW9uICcgKyByZXQuZmNuICsgJyBpbnZvY2F0aW9uJyk7CiAgICAgICAgfQogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGxldCBwYXlsb2FkID0gYXdhaXQgbWV0aG9kKHN0dWIsIHJldC5wYXJhbXMpOwogICAgICAgICAgICByZXR1cm4gc2hpbS5zdWNjZXNzKHBheWxvYWQpOwogICAgICAgIH0gY2F0Y2ggKGVycikgewogICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpOwogICAgICAgICAgICByZXR1cm4gc2hpbS5lcnJvcihlcnIpOwogICAgICAgIH0KICAgIH0KCiAgICAvKiBEdW1teSBpbml0IGZ1bmN0aW9uIGZvciB1c2Ugd2l0aCBSRVNUIGFzIGl0IHJlcXVpcmVzIHNvbWUgZnVuY3Rpb24gdG8gYmUgcGFzc2VkIGR1cmluZyBpbnN0YW50aWF0aW9uICovCiAgICAvKiBBY2Nlc3MgQ29udHJvbDogTm9uZSAqLwogICAgYXN5bmMgaW5pdFBvZUxlZGdlcihzdHViLCBhcmdzKXsKCiAgICAgICAgaWYoIGFyZ3MubGVuZ3RoICE9IDEgKXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3MuIEV4cGVjdHMgbm8gYXJncycpOwogICAgICAgIH0KICAgICAgICAgICAgICAgIAogICAgICAgIGNvbnNvbGUuaW5mbygnPT09PT09PT09PT09PSBpbml0TGVkZ2VyIExlZGdlciBEb25lID09PT09PT09PT09Jyk7ICAKICAgIH0KCiAgICAvKiBBbGxvd3MgdG8gcXVlcnkgYSBzcGVjaWZpYyBwcm9vZm9mZXggYmFzZWQgb24gdGhlIGhhc2ggdmFsdWUuIFJldHVybnMgdGhlIGZ1bGwgcmVjb3JkIGFnYWluc3Qgc3BlY2lmaWMgaGFzaC4gKi8KICAgIC8qIEFjY2VzcyBDb250cm9sOiBSZWFkZXIgYW5kIFdyaXRlciAqLwogICAgYXN5bmMgcXVlcnlQcm9vZk9mRXgoc3R1YiwgYXJncyl7CgogICAgICAgIGNvbnNvbGUuaW5mbygnPT09PT09PT09PT0gUXVlcmluZyBzcGVjaWZpYyBoYXNoID09PT09PT09PT09Jyk7CgogICAgICAgIGlmIChhcmdzLmxlbmd0aCAhPSAxKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMuIEV4cGVjdGluZyBTSEEyNTYgRWc6IGFmZmYyMTUxYWMxZjRmYTFkODUzZDM4ZGY3OTQwYTk2N2VmMTcyYzgyYzgyMDMwNTc0OGQ3MDRjZWU4MDI3MzknKTsKICAgICAgICB9ZWxzZSBpZighdmFsaWRhdG9yLmlzSGFzaChhcmdzWzBdLCAnc2hhMjU2JykpIC8vIHZhbGlkYXRpbmcgdGhlIHNoYTI1NgogICAgICAgIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgYXJndW1lbnQgcGFzc2VkLiBUcnkgQWdhaW4uJyk7CiAgICAgICAgfQoKICAgICAgICBsZXQgY2lkID0gbmV3IENsaWVudElkZW50aXR5KHN0dWIpOwoKICAgICAvLyAgIGlmIChjaWQuYXNzZXJ0QXR0cmlidXRlVmFsdWUoJ3JvbGUnLCAnYWRtaW4nKSB8fCBjaWQuYXNzZXJ0QXR0cmlidXRlVmFsdWUoJ3JvbGUnLCAnY2xpZW50JykpIHsKICAgICAgICAKICAgICAgICAgICAgY29uc29sZS5pbmZvKCc9PT09PT09PT09PT09IFJlYWRlciBvciBXcml0ZXIgaXMgcXVlcnlpbmcgUHJvb2ZPZkV4ID09PT09PT09PT09Jyk7CgogICAgICAgICAgICBsZXQgaGFzaCA9IGFyZ3NbMF07CgogICAgICAgICAgICBsZXQganNvblJlcyA9IHt9OyAvLyBlbXB0eSBvYmplY3QKICAgICAgICAKICAgICAgICAgICAgbGV0IHByb29mT2ZFeEFzQnl0ZXMgPSBhd2FpdCBzdHViLmdldFN0YXRlKGhhc2gpOyAvL2dldCB0aGUgaGFzaCBmcm9tIGNoYWluY29kZSBzdGF0ZQogICAgICAgICAgICAKICAgICAgICAgICAgaWYgKCFwcm9vZk9mRXhBc0J5dGVzIHx8IHByb29mT2ZFeEFzQnl0ZXMudG9TdHJpbmcoKS5sZW5ndGggPD0gMCkgewogICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoYXNoICsgJyBkb2VzIG5vdCBleGlzdDogVHJ5IHdpdGggb3RoZXIgc2hhMjU2LicpOwoKICAgICAgICAgICAgICAgIGxldCB0aW1lID0ge307CiAgICAgICAgICAgICAgICB0aW1lLnNlY29uZHMgPSAwOwogICAgICAgICAgICAgICAgdGltZS5uYW5vcyA9IDA7CgogICAgICAgICAgICAgICAganNvblJlcy50eElkID0gMDsKICAgICAgICAgICAgICAgIGpzb25SZXMuYXNzZXRWZXJzaW9uID0gMDsKICAgICAgICAgICAgICAgIGpzb25SZXMuc2hhMjU2SGFzaCA9IDA7CiAgICAgICAgICAgICAgICBqc29uUmVzLnNoYTFIYXNoID0gMDsKICAgICAgICAgICAgICAgIGpzb25SZXMuZmlsZU5hbWUgPSAwOwogICAgICAgICAgICAgICAganNvblJlcy5maWxlVHlwZSA9IDA7CiAgICAgICAgICAgICAgICBqc29uUmVzLmRvY3VtZW50VHlwZSA9IDA7CiAgICAgICAgICAgICAgICBqc29uUmVzLmlzc3VlZFRvID0gMDsgCiAgICAgICAgICAgICAgICBqc29uUmVzLmlzc3VlZEJ5T3JnID0gMDsKICAgICAgICAgICAgICAgIGpzb25SZXMuaXNzdWVkQnlVc2VyID0gMDsKICAgICAgICAgICAgICAgIGpzb25SZXMuY2EgPSAwOwogICAgICAgICAgICAgICAganNvblJlcy50aW1lc3RhbXAgPSB0aW1lOyAgICAgIAogICAgICAgICAgICAgICAganNvblJlcy5iYWNrTGluayA9IDA7ICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIGpzb25SZXMuZm91bmQgPSBmYWxzZTsgCiAgICAgICAgICAgICAgICAKICAgICAgICAgICAgfWVsc2UgewogICAgICAgICAgICAKICAgICAgICAgICAgICAgIC8vIGZvdW5kIHRoZSByZWNvcmQuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAganNvblJlcyA9IEpTT04ucGFyc2UocHJvb2ZPZkV4QXNCeXRlcy50b1N0cmluZygpKTsgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICBqc29uUmVzLmZvdW5kID0gdHJ1ZTsgCiAgICAgICAgICAgIH0gICAgICAgIAoKICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoanNvblJlcykpOwoKICAgICAgICAgICAgY29uc29sZS5pbmZvKCc9PT09PT09PT09PSBRdWVyaW5nIFNwZWNpZmljIGhhc2ggRG9uZSA9PT09PT09PT09PScpOwogICAgICAgICAgICAKICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KGpzb25SZXMpKTsgICAgICAgICAgICAKICAgICAgICAvLyBpZiBjaWQKICAgIH0KICAgICAgIAoKICAgIC8qIEFsbG93cyB0byBwZXJmb3JtIGNvbXBsZXggcXVlcnkgYmFzZWQgb24gdGhlIHR4aWQgdmFsdWUuIFJldHVybnMgcmVjb3JkIGZvciBzcGVjaWZpYyB0eGlkICovCiAgICAvKiBBY2Nlc3MgQ29udHJvbDogUmVhZGVyIGFuZCBXcml0ZXIgKi8KICAgIGFzeW5jIHF1ZXJ5UHJvb2ZPZkV4QnlUeGlkKHN0dWIsIGFyZ3MpewoKICAgICAgICBjb25zb2xlLmluZm8oJz09PT09PT09PT09IFF1ZXJpbmcgcmVjb3JkcyBieSBUWElEID09PT09PT09PT09Jyk7CgogICAgICAgIGlmIChhcmdzLmxlbmd0aCAhPSAxKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMuIEV4cGVjdGluZyBUWElEJyk7CiAgICAgICAgfWVsc2UgaWYoYXJnc1swXS5sZW5ndGggIT0gNjQgKSAvLyBsb29zZSB2YWxpZGF0aW9uIG9mIHR4aWQKICAgICAgICB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWlkIHR4aWQgcGFzc2VkLiBUcnkgYWdhaW4uJyk7CiAgICAgICAgfQoKICAgICAgICBsZXQgY2lkID0gbmV3IENsaWVudElkZW50aXR5KHN0dWIpOwoKICAgICAgIC8vIGlmIChjaWQuYXNzZXJ0QXR0cmlidXRlVmFsdWUoJ3JvbGUnLCAnYWRtaW4nKSB8fCBjaWQuYXNzZXJ0QXR0cmlidXRlVmFsdWUoJ3JvbGUnLCAnY2xpZW50JykpIHsKICAgICAgICAKICAgICAgICAgICAgY29uc29sZS5pbmZvKCc9PT09PT09PT09PT09IFJlYWRlciBvciBXcml0ZXIgaXMgcXVlcnlpbmcgPT09PT09PT09PT0nKTsKCiAgICAgICAgICAgIGxldCB0eGlkID0gYXJnc1swXTsgICAgICAgICAgICAKCiAgICAgICAgICAgIGxldCByZXN1bHRzSXRlcmF0b3IgPSBhd2FpdCBzdHViLmdldFN0YXRlQnlQYXJ0aWFsQ29tcG9zaXRlS2V5KCJ0eGlkfnZlcn5oYXNoMX5oYXNoMn5maWxlfmZpbGV0eXBlfmRvY3R5cGV+aXNzdWVkdG9+aXNzdWVkb3Jnfmlzc3VlZG9yZ3VzZXJ+Y2F+c2Vjfm5hbm9zfmJrbG5rIiwgW3R4aWRdKTsgCiAgICAgICAgICAgIAogICAgICAgICAgICBsZXQgYWxsUmVzdWx0cyA9IFtdOwogICAgICAgICAgICBsZXQganNvblJlcyA9IHt9OyAvLyBlbXB0eSBvYmplY3QKICAgICAgICAgICAgbGV0IHRpbWUgPSB7fTsKICAgICAgICAgICAgdGltZS5zZWNvbmRzID0gMDsKICAgICAgICAgICAgdGltZS5uYW5vcyA9IDA7CgogICAgICAgICAgICAvLyBkZWZhdWx0IHZhbHVlIGluZGljYXRpbmcgbm90IGZvdW5kCiAgICAgICAgICAgIGpzb25SZXMudHhJZCA9IDA7CiAgICAgICAgICAgIGpzb25SZXMuYXNzZXRWZXJzaW9uID0gMDsKICAgICAgICAgICAganNvblJlcy5zaGEyNTZIYXNoID0gMDsKICAgICAgICAgICAganNvblJlcy5zaGExSGFzaCA9IDA7CiAgICAgICAgICAgIGpzb25SZXMuZmlsZU5hbWUgPSAwOwogICAgICAgICAgICBqc29uUmVzLmZpbGVUeXBlID0gMDsKICAgICAgICAgICAganNvblJlcy5kb2N1bWVudFR5cGUgPSAwOwogICAgICAgICAgICBqc29uUmVzLmlzc3VlZFRvID0gMDsgCiAgICAgICAgICAgIGpzb25SZXMuaXNzdWVkQnlPcmcgPSAwOwogICAgICAgICAgICBqc29uUmVzLmlzc3VlZEJ5VXNlciA9IDA7CiAgICAgICAgICAgIGpzb25SZXMuY2EgPSAwOwogICAgICAgICAgICBqc29uUmVzLnRpbWVzdGFtcCA9IHRpbWU7CiAgICAgICAgICAgIGpzb25SZXMuYmFja0xpbmsgPSAwOwogICAgICAgICAgICBqc29uUmVzLmZvdW5kID0gZmFsc2U7CgogICAgICAgICAgICBhbGxSZXN1bHRzLnB1c2goanNvblJlcyk7IC8vIHB1c2ggZGVmYXVsdCBKU09OIG9iamVjdCB0byBsaXN0CgogICAgICAgICAgICB3aGlsZSh0cnVlKQogICAgICAgICAgICB7CiAgICAgICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVzdWx0c0l0ZXJhdG9yLm5leHQoKTsKICAgICAgICAgICAgICAgIGlmIChyZXMudmFsdWUgKSB7IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgPT09PT09PT09PSBRdWVyaW5nIE9iamVjdCA9PT09PT09PT09PT0gJyk7CgogICAgICAgICAgICAgICAgICAgIC8vIHBvcCB0aGUgZGVmYXVsdCBvYmplY3QgaW5kaWNhdGluZyBub3QgZm91bmQgY2FzZQogICAgICAgICAgICAgICAgICAgIGFsbFJlc3VsdHMucG9wKGpzb25SZXMpOyAvLyBwb3AgSlNPTiBvYmplY3QgdG8gbGlzdAogICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICBsZXQga2V5UGFydHMgPSBhd2FpdCBzdHViLnNwbGl0Q29tcG9zaXRlS2V5KHJlcy52YWx1ZS5rZXkpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICBqc29uUmVzLnR4SWQgPSBrZXlQYXJ0cy5hdHRyaWJ1dGVzWzBdOwogICAgICAgICAgICAgICAgICAgIGpzb25SZXMuYXNzZXRWZXJzaW9uID0ga2V5UGFydHMuYXR0cmlidXRlc1sxXTsKICAgICAgICAgICAgICAgICAgICBqc29uUmVzLnNoYTI1Nkhhc2ggPSBrZXlQYXJ0cy5hdHRyaWJ1dGVzWzJdOwogICAgICAgICAgICAgICAgICAgIGpzb25SZXMuc2hhMUhhc2ggPSBrZXlQYXJ0cy5hdHRyaWJ1dGVzWzNdOwogICAgICAgICAgICAgICAgICAgIGpzb25SZXMuZmlsZU5hbWUgPSBrZXlQYXJ0cy5hdHRyaWJ1dGVzWzRdOwogICAgICAgICAgICAgICAgICAgIGpzb25SZXMuZmlsZVR5cGUgPSBrZXlQYXJ0cy5hdHRyaWJ1dGVzWzVdOwogICAgICAgICAgICAgICAgICAgIGpzb25SZXMuZG9jdW1lbnRUeXBlID0ga2V5UGFydHMuYXR0cmlidXRlc1s2XTsKICAgICAgICAgICAgICAgICAgICBqc29uUmVzLmlzc3VlZFRvID0ga2V5UGFydHMuYXR0cmlidXRlc1s3XTsKICAgICAgICAgICAgICAgICAgICBqc29uUmVzLmlzc3VlZEJ5T3JnID0ga2V5UGFydHMuYXR0cmlidXRlc1s4XTsKICAgICAgICAgICAgICAgICAgICBqc29uUmVzLmlzc3VlZEJ5VXNlciA9IGtleVBhcnRzLmF0dHJpYnV0ZXNbOV07CiAgICAgICAgICAgICAgICAgICAganNvblJlcy5jYSA9IGtleVBhcnRzLmF0dHJpYnV0ZXNbMTBdOwogICAgICAgICAgICAgICAgICAgIGpzb25SZXMudGltZXN0YW1wLnNlY29uZHMgPSBrZXlQYXJ0cy5hdHRyaWJ1dGVzWzExXTsgCiAgICAgICAgICAgICAgICAgICAganNvblJlcy50aW1lc3RhbXAubmFub3MgPSBrZXlQYXJ0cy5hdHRyaWJ1dGVzWzEyXTsKICAgICAgICAgICAgICAgICAgICBqc29uUmVzLmJhY2tMaW5rID0ga2V5UGFydHMuYXR0cmlidXRlc1sxM107IAogICAgICAgICAgICAgICAgICAgIGpzb25SZXMuZm91bmQgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgIGFsbFJlc3VsdHMucHVzaChqc29uUmVzKTsgLy8gcHVzaCBKU09OIG9iamVjdCB0byBsaXN0CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIGlmIChyZXMuZG9uZSkgeyAvLyB3aGVuIGl0ZXJhdG9yIHJlcyBpcyBwYXN0IGVuZCBvZiBpdGVyYXRlZCBzZXF1ZW5jZQogICAgCiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyA9PT09PT09PT09IGVuZCBvZiBkYXRhID09PT09PT09PT09PSAnKTsKICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICBhd2FpdCByZXN1bHRzSXRlcmF0b3IuY2xvc2UoKTsKICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYWxsUmVzdWx0cyk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAKICAgICAgICAgICAgfQoKICAgICAgICAgICAgY29uc29sZS5pbmZvKCc9PT09PT09PT09PSBRdWVyaW5nIHJlY29yZHMgYnkgVFhJRCBEb25lID09PT09PT09PT09Jyk7CiAgICAKICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KGFsbFJlc3VsdHMpKTsKICAgICAgICAgICAgCiAgICAgICAgLy8gaWYgY2lkCiAgICB9CgogICAgLyogV2lsbCBhbGxvdyB0byBjcmVhdGUvcmVjb3JkIGEgbmV3IHByb29mIG9mIGV4aXN0ZW5jZSBvbiB0aGUgYmxvY2tjaGFpbi4gKi8KICAgIC8qIEFjY2VzcyBDb250cm9sOiBXcml0ZXIgT25seSAqLwogICAgYXN5bmMgcmVjb3JkUHJvb2ZPZkV4KHN0dWIsYXJncyl7CiAgICAgICAgICAgICAgICAKICAgICAgICBjb25zb2xlLmluZm8oJz09PT09PT09PT09PT0gUmVjb3JkaW5nIG5ldyBwcm9vZiA9PT09PT09PT09PScpOwogICAgICAgIGNvbnNvbGUuaW5mbyhhcmdzWzddKQogICAgICAgIAoKICAgICAgICAvLyBpZiAoYXJncy5sZW5ndGggIT0gNykgewogICAgICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLiBFeHBlY3RpbmcgNzogU0hBMjU2LCBTSEExLCBGaWxlTmFtZSwgRmlsZVR5cGUsIERvY3VtZW50VHlwZSwgSXNzdWVkVG8sIEJhY2tMaW5rJyApOwogICAgICAgIC8vIH0KICAgICAgICAKICAgICAgICBsZXQgY2lkID0gbmV3IENsaWVudElkZW50aXR5KHN0dWIpOwoKICAgICAgIC8vIGlmIChjaWQuYXNzZXJ0QXR0cmlidXRlVmFsdWUoJ3JvbGUnLCAnd3JpdGVyJykpIHsKICAgICAgICAKICAgICAgICAgICAgY29uc29sZS5pbmZvKCc9PT09PT09PT09PT09IFdyaXRlciBpcyByZWNvcmRpbmcgb24gUHJvb2ZPZkV4ID09PT09PT09PT09Jyk7CgogICAgICAgICAgICAvLyB2YWxpZGF0ZSBhcmd1bWVudHMKICAgICAgICAgICAgaWYoIHZhbGlkYXRvci5pc0hhc2goYXJnc1swXSwgJ3NoYTI1NicpICYmCiAgICAgICAgICAgICAgICB2YWxpZGF0b3IuaXNIYXNoKGFyZ3NbMV0sICdzaGExJykgJiYKICAgICAgICAgICAgICAgIHZhbGlkRmlsZW5hbWUoYXJnc1syXSkgJiYKICAgICAgICAgICAgICAgIChhcmdzWzNdLmxlbmd0aCAhPSAwKSAmJgogICAgICAgICAgICAgICAgKGFyZ3NbNF0ubGVuZ3RoICE9IDApICYmCiAgICAgICAgICAgICAgICAoYXJnc1s1XS5sZW5ndGggIT0wKQogICAgICAgICAgICApIHsKICAgICAgICAgICAgICAgIGxldCBoYXNoID0gYXJnc1swXTsKICAgICAgICAgICAgCiAgICAgICAgICAgICAgICBsZXQgcHJvb2ZPZkV4QXNCeXRlcyA9IGF3YWl0IHN0dWIuZ2V0U3RhdGUoaGFzaCk7IC8vZ2V0IHRoZSBwcm9vZiBvZiBleGlzdGVuY2UgZnJvbSBjaGFpbmNvZGUgc3RhdGUKICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgaWYgKCFwcm9vZk9mRXhBc0J5dGVzIHx8IHByb29mT2ZFeEFzQnl0ZXMudG9TdHJpbmcoKS5sZW5ndGggPD0gMCkgewoKICAgICAgICAgICAgICAgICAgICBsZXQgY2VydCA9IGNpZC5nZXRJRCgpOwoKICAgICAgICAgICAgICAgICAgICAvLyBsZXQgb3VuID0gY2VydC5zdWJqZWN0Lm9yZ2FuaXphdGlvbmFsVW5pdE5hbWU7CiAgICAgICAgICAgICAgICAgICAgLy8gaWYob3VuID09IHVuZGVmaW5lZCkKICAgICAgICAgICAgICAgICAgICAvLyAgICAgb3VuID0gICIiOwoKICAgICAgICAgICAgICAgICAgICAvLyBsZXQgb3UgPSBjZXJ0LnN1YmplY3Qub3JnYW5pemF0aW9uTmFtZTsKICAgICAgICAgICAgICAgICAgICAvLyBpZihvdSA9PSB1bmRlZmluZWQpCiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG91ID0gICIiOwoKICAgICAgICAgICAgICAgICAgIC8vICBsZXQgY24gPSBjZXJ0LnN1YmplY3QuY29tbW9uTmFtZTsKICAgICAgICAgICAgICAgICAgICAvLyBpZihjbiA9PSB1bmRlZmluZWQpCiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNuID0gICIiOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgbGV0IHByb29mb2ZleCA9IHsKICAgICAgICAgICAgICAgICAgICAgICAgLy9hc3NldFR5cGU6ICdwcm9vZm9mZXgnLCAgICAgICAgIC8vIGZvciBmdXR1cmUgdXNlCiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0VmVyc2lvbjogJzIuMCcsICAgICAgICAgICAgLy8gcHJlZmlsbGVkCiAgICAgICAgICAgICAgICAgICAgICAgIHNoYTI1Nkhhc2g6IGFyZ3NbMF0sICAgICAgICAgICAgLy8gdmFsaWRhdGUgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgc2hhMUhhc2g6IGFyZ3NbMV0sICAgICAgICAgICAgICAvLyB2YWlsZGF0ZQogICAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogYXJnc1syXSwgICAgICAgICAgICAgIC8vIHZhbGlkYXRlCiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVUeXBlOiBhcmdzWzNdLCAgICAgICAgICAgICAgLy8gdmFsaWRhdGUgZm9yIGxlbmd0aAogICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFR5cGU6IGFyZ3NbNF0sICAgICAgICAgIC8vIHZhbGlkYXRlIGZvciBsZW5ndGgKICAgICAgICAgICAgICAgICAgICAgICAgaXNzdWVkVG86IGFyZ3NbNV0sICAgICAgICAgICAgICAvLyB2YWxpZGF0ZSBmb3IgbGVuZ3RoCiAgICAgICAgICAgICAgICAgICAgICAgIGlzc3VlZEJ5T3JnOiBjaWQuZ2V0TVNQSUQoKS50b1N0cmluZygpLCAgICAgICAgLy8gQXV0byBmZXRjaAogICAgICAgICAgICAgICAgICAgICAgICBpc3N1ZWRCeVVzZXI6IGFyZ3NbN10sICAgICAgICAgICAgICAgLy8gQXV0byBmZXRjaCBiZWZvcmUgd2UgdXNlZCBhZG1pbiBoYXJkY29kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgY2E6ICJjYTEiLCAvLyBBdXRvIGZldGNoCiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kczogc3R1Yi5nZXRUeFRpbWVzdGFtcCgpLnNlY29uZHMuaGlnaC50b1N0cmluZygpICsgc3R1Yi5nZXRUeFRpbWVzdGFtcCgpLnNlY29uZHMubG93LnRvU3RyaW5nKCksICAgIC8vIEF1dG8gZmV0Y2gKICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbm9zOiBzdHViLmdldFR4VGltZXN0YW1wKCkubmFub3MudG9TdHJpbmcoKSAgICAgICAvLyBBdXRvIGZldGNoCiAgICAgICAgICAgICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgICAgICAgICAgIHR4SWQ6IHN0dWIuZ2V0VHhJRCgpLAkJCS8vIEF1dG8gZmV0Y2gKICAgICAgICAgICAgICAgICAgICAgICAgYmFja0xpbms6IGFyZ3NbNl0KICAgICAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrJykKICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9vZm9mZXguaXNzdWVkQnlVc2VyKQoKICAgICAgICAgICAgICAgICAgICBhd2FpdCBzdHViLnB1dFN0YXRlKGFyZ3NbMF0sIEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KHByb29mb2ZleCkpKTsKCiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3R4aWQ6ICcgKyBwcm9vZm9mZXgudHhJZCk7IC8vIGZvciBlYXNlIG9mIGFjY2VzcyBkdXJpbmcgdGVzdGluZwoKICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhOYW1lID0gJ3R4aWR+dmVyfmhhc2gxfmhhc2gyfmZpbGV+ZmlsZXR5cGV+ZG9jdHlwZX5pc3N1ZWR0b35pc3N1ZWRvcmd+aXNzdWVkb3JndXNlcn5jYX5zZWN+bmFub3N+YmtsbmsnOwoKICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBrZXQgZm9yIHR4aWQgYmFzZWQgc2VhcmNoZXMKICAgICAgICAgICAgICAgICAgICBsZXQgdHhpZE5hbWVJbmRleEtleSA9IGF3YWl0IHN0dWIuY3JlYXRlQ29tcG9zaXRlS2V5KGluZGV4TmFtZSwgW3Byb29mb2ZleC50eElkLCAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb29mb2ZleC5hc3NldFZlcnNpb24sCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9vZm9mZXguc2hhMjU2SGFzaCwgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9vZm9mZXguc2hhMUhhc2gsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9vZm9mZXguZmlsZU5hbWUsIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvb2ZvZmV4LmZpbGVUeXBlLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvb2ZvZmV4LmRvY3VtZW50VHlwZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb29mb2ZleC5pc3N1ZWRUbywgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9vZm9mZXguaXNzdWVkQnlPcmcsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9vZm9mZXguaXNzdWVkQnlVc2VyLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvb2ZvZmV4LmNhLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvb2ZvZmV4LnRpbWVzdGFtcC5zZWNvbmRzLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvb2ZvZmV4LnRpbWVzdGFtcC5uYW5vc10sCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9vZm9mZXguYmFja0xpbmspOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICBpZighdHhpZE5hbWVJbmRleEtleS5sZW5ndGggPD0gMCApCiAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHR4aWROYW1lSW5kZXhLZXkpOwoKICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gJ3h4JzsgLy8gZHVtbXkgdmFsdWUKICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgc3R1Yi5wdXRTdGF0ZSh0eGlkTmFtZUluZGV4S2V5LCBCdWZmZXIuZnJvbSh2YWx1ZSkpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBlbHNlCiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0eGlkTmFtZUluZGV4S2V5ICsgJ2Vycm9yIGNyZWF0aW5nIGNvbXBvc2l0ZWtleScpOyAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGVsc2UJCiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGhhc2ggKyAnIGFscmVhZHkgZXhpc3Q6IFRyeSB3aXRoIG90aGVyIGZpbGUuJyk7ICAgICAgICAgICAKCiAgICAgICAgICAgIH0vLyBpZiB2YWxpZGF0aW9ucwogICAgICAgICAgICBlbHNlCiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIHBhc3NlZDogVHJ5IGFnYWluLicpOyAgICAgICAgICAgICAgIAogICAgICAgLy8gfS8vIGlmIGNpZAogICAgICAgLy8gZWxzZQogICAgICAgIC8vICAgIHRocm93IG5ldyBFcnJvcignVXNlciBkb2VzbnQgaGF2ZSByZXF1aXJlZCBhY2Nlc3MgdG8gZXhlY3V0ZSB0aGlzIGZ1bmN0aW9uJyk7CiAgICAgICAgICAgICAgICAKICAgICAgICBjb25zb2xlLmluZm8oJz09PT09PT09PT09PT0gUmVjb3JkaW5nIG5ldyBwcm9vZiBEb25lID09PT09PT09PT09Jyk7CiAgICB9ICAgICAKfTsKCnNoaW0uc3RhcnQobmV3IENoYWluY29kZSgpKTsKCi8vIEVPRgo=";

  
  const downloadZip = (event) => {
    
    var zip = new JSZip();

    // ** Creating Folder inside a folder poe/node
    let img2 = zip.folder("poe/node");
    img2.file("package.json", jsonFile, {base64: true});
    img2.file("poe-chaincode.js", poeFile, {base64: true});
    
    zip.generateAsync({type:"blob"})
    .then(function(content) {
    saveAs(content, "poe.zip");
  });
  }

  let function1 = `async recordProofOfEx(stub,args){
                
    console.info('=================== Recording new proof ================');
    console.info(args[7])
    

    // if (args.length != 7) {
    //     throw new Error('Incorrect number of arguments. Expecting 7: SHA256, SHA1, FileName, FileType, DocumentType, IssuedTo, BackLink' );
    // }
    
    let cid = new ClientIdentity(stub);

   // if (cid.assertAttributeValue('role', 'writer')) {
    
        console.info('=================== Writer is recording on ProofOfEx ================');

        // validate arguments
        if( validator.isHash(args[0], 'sha256') &&
            validator.isHash(args[1], 'sha1') &&
            validFilename(args[2]) &&
            (args[3].length != 0) &&
            (args[4].length != 0) &&
            (args[5].length !=0)
        ) {
            let hash = args[0];
        
            let proofOfExAsBytes = await stub.getState(hash); //get the proof of existence from chaincode state
            
            if (!proofOfExAsBytes || proofOfExAsBytes.toString().length <= 0) {

                let cert = cid.getID();

                // let oun = cert.subject.organizationalUnitName;
                // if(oun === undefined)
                //     oun =  "";

                // let ou = cert.subject.organizationName;
                // if(ou === undefined)
                //     ou =  "";

               //  let cn = cert.subject.commonName;
                // if(cn === undefined)
                //     cn =  "";
                              
                let proofofex = {
                    //assetType: 'proofofex',         // for future use
                    assetVersion: '2.0',            // prefilled
                    sha256Hash: args[0],            // validate                  
                    sha1Hash: args[1],              // vaildate
                    fileName: args[2],              // validate
                    fileType: args[3],              // validate for length
                    documentType: args[4],          // validate for length
                    issuedTo: args[5],              // validate for length
                    issuedByOrg: cid.getMSPID().toString(),        // Auto fetch
                    issuedByUser: args[7],               // Auto fetch before we used admin hardcode                               
                    ca: "ca1", // Auto fetch
                    timestamp: {
                        seconds: stub.getTxTimestamp().seconds.high.toString() + stub.getTxTimestamp().seconds.low.toString(),    // Auto fetch
                        nanos: stub.getTxTimestamp().nanos.toString()       // Auto fetch
                    },
                    txId: stub.getTxID(),			// Auto fetch
                    backLink: args[6]
                };
                console.info('+++++++++++++++++++++++++++++++++++++++')
                console.log(proofofex.issuedByUser)

                await stub.putState(args[0], Buffer.from(JSON.stringify(proofofex)));

                console.log('txid: ' + proofofex.txId); // for ease of access during testing

                let indexName = 'txid~ver~hash1~hash2~file~filetype~doctype~issuedto~issuedorg~issuedorguser~ca~sec~nanos~bklnk';

                // create a ket for txid based searches
                let txidNameIndexKey = await stub.createCompositeKey(indexName, [proofofex.txId, 
                                                                                    proofofex.assetVersion,
                                                                                    proofofex.sha256Hash, 
                                                                                    proofofex.sha1Hash,
                                                                                    proofofex.fileName, 
                                                                                    proofofex.fileType,
                                                                                    proofofex.documentType,
                                                                                    proofofex.issuedTo, 
                                                                                    proofofex.issuedByOrg,
                                                                                    proofofex.issuedByUser,
                                                                                    proofofex.ca,
                                                                                    proofofex.timestamp.seconds,
                                                                                    proofofex.timestamp.nanos],
                                                                                    proofofex.backLink);                                                                            
                if(!txidNameIndexKey.length <= 0 )
                {                    
                    console.log(txidNameIndexKey);

                    let value = 'xx'; // dummy value
                
                    await stub.putState(txidNameIndexKey, Buffer.from(value));
                }
                else
                    throw new Error(txidNameIndexKey + 'error creating compositekey');                
            }
            else	
                throw new Error(hash + ' already exist: Try with other file.');           

        }// if validations
        else
            throw new Error('Invalid arguments passed: Try again.');               
   // }// if cid
   // else
    //    throw new Error('User doesnt have required access to execute this function');
            
    console.info('=================== Recording new proof Done ================');
}     
};

shim.start(new Chaincode());

`

  let function3 = `
  
  async queryProofOfExByTxid(stub, args){

    console.info('================ Quering records by TXID ================');

    if (args.length != 1) {
        throw new Error('Incorrect number of arguments. Expecting TXID');
    }else if(args[0].length != 64 ) // loose validation of txid
    {
        throw new Error('Invaid txid passed. Try again.');
    }

    let cid = new ClientIdentity(stub);

   // if (cid.assertAttributeValue('role', 'admin') || cid.assertAttributeValue('role', 'client')) {
    
        console.info('=================== Reader or Writer is querying ================');

        let txid = args[0];            

        let resultsIterator = await stub.getStateByPartialCompositeKey("txid~ver~hash1~hash2~file~filetype~doctype~issuedto~issuedorg~issuedorguser~ca~sec~nanos~bklnk", [txid]); 
        
        let allResults = [];
        let jsonRes = {}; // empty object
        let time = {};
        time.seconds = 0;
        time.nanos = 0;

        // default value indicating not found
        jsonRes.txId = 0;
        jsonRes.assetVersion = 0;
        jsonRes.sha256Hash = 0;
        jsonRes.sha1Hash = 0;
        jsonRes.fileName = 0;
        jsonRes.fileType = 0;
        jsonRes.documentType = 0;
        jsonRes.issuedTo = 0; 
        jsonRes.issuedByOrg = 0;
        jsonRes.issuedByUser = 0;
        jsonRes.ca = 0;
        jsonRes.timestamp = time;
        jsonRes.backLink = 0;
        jsonRes.found = false;

        allResults.push(jsonRes); // push default JSON object to list

        while(true)
        {
            let res = await resultsIterator.next();
            if (res.value ) { 
                            
                console.log(' =============== Quering Object ================== ');

                // pop the default object indicating not found case
                allResults.pop(jsonRes); // pop JSON object to list
                       
                let keyParts = await stub.splitCompositeKey(res.value.key)
                           
                jsonRes.txId = keyParts.attributes[0];
                jsonRes.assetVersion = keyParts.attributes[1];
                jsonRes.sha256Hash = keyParts.attributes[2];
                jsonRes.sha1Hash = keyParts.attributes[3];
                jsonRes.fileName = keyParts.attributes[4];
                jsonRes.fileType = keyParts.attributes[5];
                jsonRes.documentType = keyParts.attributes[6];
                jsonRes.issuedTo = keyParts.attributes[7];
                jsonRes.issuedByOrg = keyParts.attributes[8];
                jsonRes.issuedByUser = keyParts.attributes[9];
                jsonRes.ca = keyParts.attributes[10];
                jsonRes.timestamp.seconds = keyParts.attributes[11]; 
                jsonRes.timestamp.nanos = keyParts.attributes[12];
                jsonRes.backLink = keyParts.attributes[13]; 
                jsonRes.found = true;
                   
                allResults.push(jsonRes); // push JSON object to list
            }
                           
            if (res.done) { // when iterator res is past end of iterated sequence

                console.log(' =============== end of data ================== ');
                
                await resultsIterator.close();
                console.info(allResults);
                break;
            }              
        }

        console.info('================ Quering records by TXID Done ================');

        return Buffer.from(JSON.stringify(allResults));
        
    // if cid
}
`

let function2 = `
async queryProofOfEx(stub, args){

  console.info('================ Quering specific hash ================');

  if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting SHA256 Eg: afff2151ac1f4fa1d853d38df7940a967ef172c82c820305748d704cee802739');
  }else if(!validator.isHash(args[0], 'sha256')) // validating the sha256
  {
      throw new Error('Incorrect argument passed. Try Again.');
  }

  let cid = new ClientIdentity(stub);

//   if (cid.assertAttributeValue('role', 'admin') || cid.assertAttributeValue('role', 'client')) {
  
      console.info('=================== Reader or Writer is querying ProofOfEx ================');

      let hash = args[0];

      let jsonRes = {}; // empty object
  
      let proofOfExAsBytes = await stub.getState(hash); //get the hash from chaincode state
      
      if (!proofOfExAsBytes || proofOfExAsBytes.toString().length <= 0) {
          
          console.log(hash + ' does not exist: Try with other sha256.');

          let time = {};
          time.seconds = 0;
          time.nanos = 0;

          jsonRes.txId = 0;
          jsonRes.assetVersion = 0;
          jsonRes.sha256Hash = 0;
          jsonRes.sha1Hash = 0;
          jsonRes.fileName = 0;
          jsonRes.fileType = 0;
          jsonRes.documentType = 0;
          jsonRes.issuedTo = 0; 
          jsonRes.issuedByOrg = 0;
          jsonRes.issuedByUser = 0;
          jsonRes.ca = 0;
          jsonRes.timestamp = time;      
          jsonRes.backLink = 0;                    
          jsonRes.found = false; 
          
      }else {
      
          // found the record.                                           
          jsonRes = JSON.parse(proofOfExAsBytes.toString());                
          jsonRes.found = true; 
      }        

      console.log(JSON.stringify(jsonRes));

      console.info('================ Quering Specific hash Done ================');
      
      return Buffer.from(JSON.stringify(jsonRes));            
  // if cid
}
`


  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
    <div style={{ width: '100%', height: '14%' }}>
      <Header/>
    </div>
    <div className="container-fluid" style={{ width: '100%', height: '86%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }}>
      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 col-md-3 bd-highlight">
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <strong>Template</strong>
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body">
                
                  <select
                    className="form-select"
                    multiple
                    aria-label="multiple select example"
                    onChange={(e) => setTemplate(e.target.value)}
                    size="3"
                  >
                    <option hidden={true}>2</option>
                    <option value="Proof Of Existence">Proof Of Existence(PoE)</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Insurance">Insurance</option>
                    <option value="PDS">PDS</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  <strong>Stake Holder</strong>
                </button>
              </h2>
              {template === 'Proof Of Existence' && (
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo"
                >
                  <div className="accordion-body">
                  

                    <select
                      id="yourselect"
                      className="form-select"
                      multiple
                      aria-label="multiple select example"
                      onChange={(e) => setStake(e.target.value)}
                      size="2"
                    >
                      <option hidden={true}>2</option>
                      <option value="Issuer">Issuer</option>
                      <option value="Verifier">Verifier</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  <strong>Function</strong>
                </button>
              </h2>
              {template === 'Proof Of Existence' && stake === 'Issuer' && (
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div className="accordion-body">
                   
                    <select
                      className="form-select"
                      multiple
                      aria-label="multiple select example"
                      onChange={(e) => setFunction(e.target.value)}
                      size="3"
                    >
                      <option hidden={true}>2</option>
                      <option value="RecordProofOfExistence">RecordProofOfExistence</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* ************** Adding Verifier values to the PoE ***** */}

              {template === 'Proof Of Existence' && stake === 'Verifier' && (
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div className="accordion-body">
                   
                    <select
                      className="form-select"
                      multiple
                      aria-label="multiple select example"
                      onChange={(e) => setFunction(e.target.value)}
                      size="3"
                    >
                      <option hidden={true}>2</option>
                      <option value="QueryProofOfExistence">QueryProofOfExistence</option>
                      <option value="QueryProofOfExByTxid">QueryProofOfExByTxid</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -------------FLEX ITEM 2--------------- */}
        <div className="p-2 col-md-6 bd-highlight">
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="12"
              placeholder="Template will be displayed here"
              disabled
            ></textarea>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button
              className="btn btn-success me-md-2"
              type="button"
              onClick={() =>
                (document.getElementById(
                  'exampleFormControlTextarea1'
                ).disabled = false)
              }
            >
              Edit      
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={() =>
                arr.includes(func)
                  ? alert('already present')
                  : setArr((oldArray) => [...oldArray, func])
              }
            >
              Save
            </button>
          </div>
        </div>

        {/* -------------FLEX ITEM 3--------------- */}
        <div className="p-2 col-md-3 bd-highlight">
          {/* <textarea
            className="form-control mb-3"
            id="exampleFormControlTextarea2"
            rows="5"
            placeholder="Description"
            readOnly
          ></textarea> */}

          <div className="accordion" id="accordionPanelsStayOpen">
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-heading">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapse"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapse"
                >
                  <strong>Selected Function</strong>
                </button>
              </h2>

              <div
                id="panelsStayOpen-collapse"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-heading"
              >
                {arr.map((ele,index) => (
                  <ul>
                    <div className='d-flex flex-row justify-content-center'>
                    <li key={index}>{ele}</li>{' '}
                    {/* <button
                      onClick={() => setArr(arr.filter((item) => item != ele))}
                    > */}
                      {/* Remove */}
                      <TiDelete onClick={() => setArr(arr.filter((item) => item !== ele))} style={{fontSize: "18px",marginLeft:"10px"}} className='mt-1' key={index}/>
                    {/* </button>{' '} */}
                    </div>
                  </ul>
                ))}
                {/* {console.log(arr)} */}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-success mt-3 d-flex justify-content-center m-auto"
            onClick={downloadZip}
          >
            Download Smart <br></br>Contract Zip File
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SmartContractScreen
