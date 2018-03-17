---
layout: post
title: Hadoop Part 1 - Installation
description: "This is to share some experience on hadoop installation and basic dev"
author: PhenixLi
---
Big data and machine learning are very hot topic in recent years.
They are the two face of a coin, when you see the term "machine learning", the first thing in you mine is most likely "big data".
But when you talking about "big data", what appear in you brain first is most likely the elephant "Hadoop".

[![image alt text here](/assets/img/2018-03-08-Hadoop-Part-1/220px-Hadoop_logo_new.svg.png)](http://hadoop.apache.org/) is an open-source tool for big data analysis,
initial release on Dec 2011 and the latest release is version 3.0.0.
Although it is famous, it would be different for individuals to experience it's power. 
It is because it requires a farm of computers to release it's magic which most of you may never have at your home or even your office (especially in HK ... :(). 

In this article, the way to setup this elephant under VM environment will be shared.
You can have a closer look to "Hadoop" easier, and you can also use it as a test environment to evaluate your own code/job before deploy to a big farm of computer for easier debuging. Enjoy ;).

## Setup a 2-node Hadoop cluster (using 2 VirtualBox VM)
### Step 0: Software download location 
* Download CentOS7 installation disk image (ISO) file from <https://www.centos.org/download/> 
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/Download-CentOS7.png)
* Downlaod and install the latest VirtualBox from <https://www.virtualbox.org/wiki/Downloads>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/Download-VirtualBox.png)
* Download Hadoop version 3.0.0 from <http://hadoop.apache.org/releases.html> 
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/Download-Hadoop.png)
* Download Oracle JDK 8 from <http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/Download-JVM.png)

### Step 1: Create first VM "centos7-alpha" on VirtualBox
* Create VM with settings as below
	- VM Name: centos7-alpha <br>
	- Memory: 4GB <br>
	- Virtual HDD Type: VDI (VirtualBox Disk Image), Dynamically Allocated (to say disk space) <br>
	- Virtual HDD Size: 40GB (have to be large enough to install software) <br>
	- Network Adapter Type: NAT (temporary used for easier software installation with internet access) <br>
	- Boot Sequence: Optical Drive First
	- OS: CentOS 7
	- Hostname: centos7-alpha (192.168.56.3)
	- Hostname of the other node: centos7-beta (192.168.56.4)

![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-1.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-2.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-3.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-4.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-5.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-6.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-8.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-11.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-12.png)

> PS: Details please refer to [VirtualBox doc](https://www.virtualbox.org/wiki/End-user_documentation)

* Mount the DVD image file to Optical Drive, power up VM and install CentOS7

![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-8.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-9.png)
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/create-vm-10.png)


### Step 2: Configure VM and install required software

* Create OS user "hadoop" with home directory located at "/home/hadoop"
> Execute below command from terminal window
```bash
	sudo useradd hadoop
	sudo passwd hadoop
```
> PS: You can also create users during the OS installations.

* <a name="Configure-hostname"></a>Configure the hostname to centos7-alpha
> Update the file "/etc/hostname", ie.
```bash
	cat /etc/hostname
	centos7-alpha.com
```
> Update the file "/etc/sysconfig/network" to add the line "HOSTNAME=centos7-alpha.com", ie.
```bash
	cat /etc/sysconfig/network
	# Created by anaconda
	HOSTNAME=centos7-alpha.com
```
> update the file "/etc/hosts" to include IP of both hosts, ie.
```bash
	cat /etc/hosts
	127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
	::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
	192.168.56.3    centos7-alpha.com centos7-alpha
	192.168.56.4    centos7-beta.com centos7-beta
```
> Ref: [Ubuntu Linux Change Hostname (computer name)](https://www.cyberciti.biz/faq/ubuntu-change-hostname-command/), 
> [Change a server's hostname in CentOS](https://support.rackspace.com/how-to/centos-hostname-change/)

* Stop firewall (or open port for inter-communication across Hadoop cluster nodes),
> Execute below command from terminal window
```bash
	systemctl stop firewalld.service
	chkconfig firewalld off
```
> PS: This have to be done with root privilege.<br>
> Ref: [Resolve no route to host](https://superuser.com/questions/863456/im-able-to-ssh-into-host-but-not-to-access-it-from-browser-no-route-to-host)

* Install Oracle JDK 8
> Download the JDK rpm package (jdk-Bu161-linux-x64.rpm) from [download link](http://download.oracle.com/otn-pub/java/jdk/8u161-b12/2f38c3b165be4555a1fa6e98c45e0808/jdk-8u161-linux-x64.rpm) and stored in home directory of user "hadoop"<br><br>
> Install JDK 8, by execute below command from terminal window under home directory
```bash
	rpm -UvH jdk-Bu161-linux-x64.rpm
```
> PS: This have to be done with root privilege<br><br>
> Configure JDK 8 as default JVM by adding below lines to file ".bashrc" under user "hadoop"
```bash
	export JAVA_HOME=/usr/java/jdk1.8.0_161
	export PATH=$JAVA_HOME/bin:$PATH:$HADOOP_HOME/sbin
```

### Step 3: Install and Configure Hadoop
* Suggested hadoop settings
	- Hadoop version: 3.0.0
	- Hadoop home: /home/hadoop (Same as user home)
	- Java version: Java(TM) SE Runtime Environment (build 1.8.0_161-b12)
	- Hadoop data dir: /home/hadoop/hadoop-infra
	- Hadoop Namenode: centos7-alpha
>
* Install Hadoop
> Download the hadoop binary tarball (hadoop-3.0.0.tar.gz) from the [download link](http://www.apache.org/dyn/closer.cgi/hadoop/common/hadoop-3.0.0/hadoop-3.0.0.tar.gz) and store under home directory of user "hadoop"<br><br>
> Extract the hadoop binary tarball to home directory by command
``` bash
	tar -vzxf hadoop-3.0.0.tar.gz
	mv hadoop-3.0.0/* ./
	rmdir hadoop-3.0.0
```
> The directory structure will be as below <br>
>	![alt text](/assets/img/2018-03-08-Hadoop-Part-1/hadoop-directory-structure.png)<br>

>> Configure the required environment variables by adding below command to file ".bashrc" under user "hadoop"
```bash
	export HADOOP_HOME=/home/hadoop 
	export HADOOP_MAPRED_HOME=$HADOOP_HOME 
	export HADOOP_COMMON_HOME=$HADOOP_HOME 
	export HADOOP_HDFS_HOME=$HADOOP_HOME 
	export YARN_HOME=$HADOOP_HOME 
	export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native 
	export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin 
	export HADOOP_INSTALL=$HADOOP_HOME 
	export LD_LIBRARY_PATH=/home/hadoop/lib/native  # For Native Library
```
> Modify "/home/hadoop/etc/hadoop/core-site.xml" as below
```bash
	cat /home/hadoop/etc/hadoop/core-site.xml
```
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/core-site-xml.png)<br>
> Modify "/home/hadoop/etc/hadoop/hdfs-site.xml" as below
```bash
	cat /home/hadoop/etc/hadoop/hdfs-site.xml 
```
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/hdfs-site-xml.png)<br>
> Modify "/home/hadoop/etc/hadoop/yarn-site.xml" as below
```bash
	cat /home/hadoop/etc/hadoop/yarn-site.xml
```
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/yarn-site-xml.png)<br>
```bash
	The value of properties "yarn.application.classpath" have to include all jar files in below paths
	/home/hadoop/share/hadoop/common,
	/home/hadoop/share/hadoop/common/lib,
	/home/hadoop/share/hadoop/hdfs,
	/home/hadoop/share/hadoop/hdfs/lib,
	/home/hadoop/share/hadoop/yarn,
	/home/hadoop/share/hadoop/yarn/lib
```
> Modify "/home/hadoop/etc/hadoop/mapred-site.xml" as below
```bash
	cat /home/hadoop/etc/hadoop/mapred-site.xml
```
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/mapred-site-xml.png)<br>
```bash
	The value of properties "mapreduce.application.classpath" have to include all jar files in below paths
	/home/hadoop/share/hadoop/common,
	/home/hadoop/share/hadoop/common/lib,
	/home/hadoop/share/hadoop/hdfs,
	/home/hadoop/share/hadoop/hdfs/lib,
	/home/hadoop/share/hadoop/mapreduce
```
> Modify "/etc/hadoop/etc/hadoop/workers" to include hostname of all nodes as below
```bash
	cat /home/hadoop/etc/hadoop/workers
```
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/workers.png)<br>
> Up to now, the installation of VM "centos7-alpha" is completed.

### Step 4: Create another node "centos7-beta"
* Clone VM "centos7-alpha" to VM "centos7-beta"
> Power off VM "centos7-alpha"<br>
> Clone VM "centos7-alpha" to another VM "centos7-beta" in virtual box manager
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-4.png)
* Change the virtual network adaptor of both VM to Host-only Adaptor
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-12.png)<br>
> Ref: [Oracle VM VirtualBox: Networking options and how-to manage them](https://blogs.oracle.com/scoter/networking-in-virtualbox-v2)
* Update the host settings
> Power up VM "centos7-beta"<br>
> Configure the hostname from "centos7-alpha" to "centos7-beta" follow [step above](#Configure-hostname)<br>
> Restart VM "centos7-beta" to make the changes effective
* Configure SSH to ensure each cluster node can login itself and all other node without password
> Start both VM <br>
> Ssh-key config to ensure localhost can be reached without password
```bash
	ssh-keygen
	cp /home/hadoop.ssh/id_rsa.pub .ssh/authorized_keys
```
> Test to login localhost
```bash
	ssh localhost
```
> Ssh-key config to ensure other node can be reach without password
```bash
	ssh-copy-id <hostname-of-target-node>
```
> Test to login other node
```bash
	ssh <hostname-of-target-node>
```
> Ref: [ssh login without password](https://www.linuxtrainingacademy.com/ssh-login-without-password/)

### Step 5: Startup Hadoop
* Format HDFS
> Execute below command from terminal window
```bash
	hdfs namenode -format
```
> PS: This is done only on first namenode startup
* Start DFS
> Execute below command from terminal window
```bash
	start-dfs.sh
	Starting namenodes on [centos7-alpha]
	Starting datanodes
	Starting secondary namenodes [centos7-alpha.com]
```
> After the scripted completed, verify the process as below
```bash
	[hadoop@centos7-alpha ~]$ jps
	6304 SecondaryNameNode
	6084 DataNode
	5948 NameNode
	6510 Jps
```
```bash
	[hadoop@centos7-beta ~]$ jps
	2678 DataNode
	2861 Jps
```

* Start Yarn
> Execute below command from terminal window
``` bash
	start-yarn.sh
	Starting resourcemanager
	Starting nodemanagers
```
> After the scripted completed, verify the process as below
```bash
	[hadoop@centos7-alpha ~]$ jps
	6304 SecondaryNameNode
	6084 DataNode
	5948 NameNode
	6716 ResourceManager
	6846 NodeManager
	7246 Jps
```
```bash
	[hadoop@centos7-beta ~]$ jps
	2977 NodeManager
	2678 DataNode
	2861 Jps
```

* Start job history server
> Execute below command from terminal window
``` bash
	mapred --daemon start historyserver
```
> After the scripted completed, verify the process as below
```bash
	[hadoop@centos7-alpha ~]$ jps
	6304 SecondaryNameNode
	6084 DataNode
	5948 NameNode
	6716 ResourceManager
	6846 NodeManager
	7373 JobHistoryServer
	7246 Jps
```

> PS: Above startup scripts only need to runs on one node only, hadoop processes will be started in all nodes in the cluster  

### Step 6: Hadoop consoles for cluster information
* Cluster information
> Console URL: http://centos7-alpha:9870<br>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/console-all-applications.png)<br>
* Node information
> Console URL: http://centos7-alpha:8088<br>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/console-node-info.png)<br>
* Job history
> Console URL: http://centos7-alpha:19888<br>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/console-job-history.png)<br>

### Step 7: Stop Hadoop
* Stop job history server
> Execute below command from terminal window
``` bash
	mapred --daemon stop historyserver
```

* Stop Yarn
> Execute below command from terminal window
``` bash
	stop-yarn.sh
```

* Stop DFS
> Execute below command from terminal window
``` bash
	stop-dfs.sh
```
* Verify the hadoop processes stopped
```bash
	[hadoop@centos7-alpha ~]$ jps
	7246 Jps
```
```bash
	[hadoop@centos7-beta ~]$ jps
	2861 Jps
```


Ref: [Tutorial Point](Ref: https://www.tutorialspoint.com/hadoop/hadoop_enviornment_setup.htm), [Hadoop cluster setup (official)](https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/ClusterSetup.html)
