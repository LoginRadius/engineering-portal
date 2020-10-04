# EternalBlue: A retrospective on one of the biggest Windows exploits ever

There are many stories floating around on the internet about computers viruses and worms that made an enormous impact on the world. From legends like the blistering fast SLAMMER worm from 2003 or the I LOVE Bug worm that set the stage for the fishing email notoriety we see today. But the story behind **EternalBlue** really has it all. Leaked straight out of the **NSA's** toolbox, it was a key asset for the well-known **WannaCry** ransomware to wreak havoc on the world. Some will even argue that it let to a full on "Cyber War"... 

Before we start, this story is way to complex to fully cover in a short blog. We are skipping a lot, so go out and read more if your are interested. 



## The beginning

From 2016 to 2017, the InfoSec community was turned upside down by the so called **"Shadow Brokers"**. This unknown, mysterious group was responsible for five major leaks containing classified hacking tools collected and archived by the NSA. The NSA has an unprecedented catalog of unknown exploits and backdoors, as a result of decades of hoarding. But instead of notifying the software vendor about these vulnerabilities, they keep these to themselves. These exploits are valuable weapons for the NSA to protect the United States of America and its citizens (controversial, but a topic for another day). 

On April 14, 2017, the Shadow Brokers released there fifth leak containing multiple exploits. Infamous Eternal Blue was one of them

## So what does EternalBlue do exactly?

Fantastic question! EternalBlue takes advantage of a vulnerability seen in Microsoft's implementation of the SMB protocol. SMB stands for Server Message Block. It is primarily used in Windows for shared folders. Like most of these protocols, it makes communication between two nodes on a network possible via request-response messages (gross over-simplification). 

However, Microsoft made a critical error in the way these request messages where handled. By sending a carefully made request to port 445 (which was by default open) containing more data than expected, an attacker was able to set a "buffer overflow" in motion. Making the execution of unsigned (and thus malicious) code possible. 



## MS17-010

A month before the leak, something really remarkable happend. The NSA actually contacted Microsoft to inform them about EternalBlue, presumably because the NSA knew something was about to go down. Microsoft got to work immediately and mysteriously delayed it's Patch Tuesday because of a "last minute issue". They eventually released a security bulletin on March 14th, the now infamous: MS17-010.  Unfortunately, such a wide-spread piece of software like Windows has a very slow update adaption rate. This proved once again to be true...

## WannaCry

On May 12, 2017 the WannaCry (powered by EternalBlue) ransomware attack took the world by storm infecting an encrypting 230,000 computers in over 150 countries. Russia, Ukraine, India and Taiwan where affected the most, according to Kaspersky Lab. Huge factories from Nissan and Renault came to a screeching halt. NHS hospitals in the UK where severely effected by the attack and where locked out of essential medical equipement. Some estimated that economic losses could be in the hundreds of millions. North Korea is the main suspect for the attack. Two North Korean hackers have been expedited. 

## NotPetya

Not much later on 27 June 2017, Ukraine got absolutely stomped by another viscous cyberattack. Armed with EternalBlue, the malware called "NotPetya" was able to cause major damage. The attack was mainly targeted towards Ukrainian banks,  government body's and state owned organizations and. Think airports, railways and telekom companies. Even the radiation monitoring at the Chernobyl Nuclear Power Plant went offline. Because the attack seen to be aimed at paralysing the Ukrainian state rather for monetary motives, Russia is the main suspect. Although Ukrainian authorities and the CIA spook out, Russia denies any involvement. 


## Present day

Scary stuff right? Should you still be worried about EternalBlue in 2020? Well the exploit surely lives up to it's name. In 2019, two years after WannaCry broke lose, 73,763 detections where made of specific malware samples know to use EternalBlue, according to Trend Micro. Luckily, Microsoft's MS17-010 patch has reached most home users. But organizations are notoriously slow with updating their hardware. This is why EternalBlue is still a popular attack today. 

But what can you do, you might ask? If we can take one thing out of this, it that we should stop using SMB over the internet. EternalBlue is certainly not the last SMB related exploit. Blue's younger brother, SMBleed (CVE-2020-1206), is a new vulnerbility and works in a very similar way. It was only patched by Microsoft in June of this year. 

### Used Sources
https://arstechnica.com/information-technology/2017/04/nsa-leaking-shadow-brokers-just-dumped-its-most-damaging-release-yet/

https://research.checkpoint.com/2017/eternalblue-everything-know/

https://docs.microsoft.com/nl-nl/security-updates/securitybulletins/2010/ms10-017

https://www.independent.co.uk/news/uk/home-news/nissan-sunderland-cyber-attack-ransomware-nhs-malware-wannacry-car-factory-a7733936.html

https://www.cbsnews.com/news/hospitals-across-britain-hit-by-ransomware-cyberattack/

https://www.bbc.com/news/world-europe-39907965

https://www.bbc.com/news/technology-40706093

https://www.nytimes.com/2017/06/28/world/europe/ukraine-ransomware-cyberbomb-accountants-russia.html

https://www.independent.co.uk/news/world/europe/chernobyl-ukraine-petya-cyber-attack-hack-nuclear-power-plant-danger-latest-a7810941.html

https://www.securityweek.com/smbleed-vulnerability-impacts-windows-smb-protocol

https://www.trendmicro.com/vinfo/us/security/news/vulnerabilities-and-exploits/putting-the-eternal-in-eternalblue-mapping-the-use-of-the-infamous-exploit