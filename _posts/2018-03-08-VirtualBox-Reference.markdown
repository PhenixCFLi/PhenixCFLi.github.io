---
layout: post
title: Hadoop Installation and Evaluation (Part 1)
description: "This is to share some experience on hadoop installation and basic dev"
author: PhenixLi
published: false
---
Big data and machine learning are very hot topic in recent years.
They are the two face of a coin, when you see the term "machine learning", the first thing in you mine is most likely "big data".
But when you talking about "big data", what appear in you brain first is most likely the elephant "Hadoop".

[![image alt text here](/assets/img/2018-03-08-Hadoop-Part-1/220px-Hadoop_logo_new.svg.png)](http://hadoop.apache.org/) is an open-source tool for big data analysis,
initial release on Dec 2011 and the latest release is version 3.0.0.
Although it is famous, it would be different for individuals to experience it's power. 
It is because it requires a farm of computers to release it's magic which most of you may never have at your home or even your office (especially in HK ... :(). 

In this article, the way to setup and evaluate this elephant under VM environment will be shared.
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
	- Hostname: centos7-alpha
	- Hostname of the other node: centos7-beta

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
sudo password hadoop
```
> PS: You can also create users during the OS installations.

* Configure the hostname to centos7-alpha
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
>
* Install Hadoop
> Download the hadoop binary tarball (hadoop-3.0.0.tar.gz) from the [download link](http://www.apache.org/dyn/closer.cgi/hadoop/common/hadoop-3.0.0/hadoop-3.0.0.tar.gz) and store under home directory of user "hadoop"<br><br>
> Extract the hadoop binary tarball to home directory by command
``` bash
	tar -vzxf hadoop-3.0.0.tar.gz
	mv hadoop-3.0.0/* ./
	rmdir hadoop-3.0.0
```
> The directory structure will be as below
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/hadoop-home-structure.png)
> Configure the required environment variables by adding below command to file ".bashrc" under user "hadoop"
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
> Modify "/home/hadoop/etc/hadoop/hdfs-site.xml" as below
```bash
	cat /home/hadoop/etc/hadoop/hdfs-site.xml 
```
> Modify "/home/hadoop/etc/hadoop/yarn-site.xml" as below
```bash
	cat /home/hadoop/etc/hadoop/yarn-site.xml
```
> Modify "/home/hadoop/etc/hadoop/mapred-site.xml" as below
```bash
	cat /home/hadoop/etc/hadoop/mapred-site.xml
```
> Modify "/etc/hadoop/worker" as below
```bash
```
> Up to now, the installation of first VM "centos7-alpha" is completed.

### Step 4: Clone VM "centos7-alpha" to create another node "centos7-beta"
* Power off "centos7-alpha"
* Right click on VM "centos7-alpha" option in virtual box manager
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-1.png)

* Select "clone..." in popup menu <br>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-2.png)

* Input new machine name "centos7-beta" ,select option "Reinitialize the MAC address of all network cards" and click "Continue" button.
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-4.png)

* Select "Full clone" as clone type, then click "Clone" button.
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-5.png)

* Wait a while, then the new VM centos7-beta is created.
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-6.png)

* Change the network configurations to allow both VM to communciate via IP network
> Right the arrow beside "Global Tools" in virtaul box manager.
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-6.png)<br>
> Select "Host Network Manager" in the popup menu. <br>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-8.png)<br>
> Click "Create" button to create a new host-only network "vboxnet0" with default subnet "192.168.56.1/24".
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-10.png)<br>
> Select the option "Enable" to enable the DHCP server for the subnet.
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-11.png)<br>
> Go back to main window of virtual box manager, right click on VM "centos7-beta".
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-6.png)<br>
> Select "Settings..." in the popup menu.<br>
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-7.png)<br>
> Select "Network" tab, select "Host-only Adapter" and "vboxnet0" and click "OK" button.
![alt text](/assets/img/2018-03-08-Hadoop-Part-1/clone-vm-12.png)<br>
> Repeat last 3 steps for VM "centos7-alpha".

> Ref: [Oracle VM VirtualBox: Networking options and how-to manage them](https://blogs.oracle.com/scoter/networking-in-virtualbox-v2)

* Update hostname and other system settings on the VMs
>- Power on both VM


