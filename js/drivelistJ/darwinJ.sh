#!/bin/sh

function get_key {
  grep "$1" | awk -F "  +" '{ print $3 }'
}

function get_until_paren {
  awk 'match($0, "\\(|$"){ print substr($0, 0, RSTART - 1) }'
}

DISKS="`diskutil list | get_until_paren`"

for disk in $DISKS; do
  disk4=`echo ${disk:0:4}`
  if [ "$disk4" != "disk" ]; then
    continue
  fi

  diskinfo="`diskutil info $disk`"

  device=`echo "$diskinfo" | get_key "Device Node"`
  description=`echo "$diskinfo" | get_key "Device / Media Name"`
  mountpoint=`echo "$diskinfo" | get_key "Mount Point"`
  removable=`echo "$diskinfo" | get_key "Removable Media"`
  location=`echo "$diskinfo" | get_key "Device Location"`
  size=`echo "$diskinfo" | get_key "Total Size" | perl -n -e'/\((\d+)\sBytes\)/ && print $1'`
  mounted=`echo "$diskinfo" | get_key "Mounted"`

  # Omit not mounted
  if [ "$mounted" != "Yes" ]; then
   continue
  fi

  # Omit mounted DMG images
#  if [ "$description" == "Disk Image" ]; then
#   continue
#  fi

  echo "device: $device"
  echo "description: $description"
  echo "size: $size"
  echo "mountpoint: $mountpoint"
  echo "name: $device"

  if [[ "$device" == "/dev/disk0" ]] || \
     [[ "$removable" == "No" ]] || \
     [[ ( "$location" == "Internal" ) && ( "$removable" != "Yes" ) ]] || \
     [[ "$mountpoint" == "/" ]]
  then
    echo "system: True"
  else
    echo "system: False"
  fi

  if [ "$mounted" == "Yes" ]; then
    echo "mounted: True"
  else
    echo "mounted: False"
  fi

  echo ""
done
