function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    local PP1=$(one_line_pem $6)
    local PP2=$(one_line_pem $a)
    local PP3=$(one_line_pem $b)
    local PP4=$(one_line_pem $c)
    local PP5=$(one_line_pem $d)
    local PP6=$(one_line_pem $e)
    local PP7=$(one_line_pem $f)
    local PP8=$(one_line_pem $g)
    local PP9=$(one_line_pem $h)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        -e "s#\${PEERPEM1}#$PP1#" \
        -e "s#\${P0PORT1}#$7#" \
        -e "s#\${PEERPEM2}#$PP2#" \
        -e "s#\${P0PORT2}#$8#" \
        -e "s#\${PEERPEM3}#$PP3#" \
        -e "s#\${P0PORT3}#$9#" \
        -e "s#\${PEERPEM4}#$PP4#" \
        -e "s#\${P0PORT4}#$ten#" \
        -e "s#\${PEERPEM5}#$PP5#" \
        -e "s#\${P0PORT5}#$eleven#" \
        -e "s#\${PEERPEM6}#$PP6#" \
        -e "s#\${P0PORT6}#$twelve#" \
        -e "s#\${PEERPEM7}#$PP7#" \
        -e "s#\${P0PORT7}#$thirteen#" \
        -e "s#\${PEERPEM8}#$PP8#" \
        -e "s#\${P0PORT8}#$fourteen#" \
        -e "s#\${PEERPEM9}#$PP9#" \
        -e "s#\${P0PORT9}#$fifteen#" \ 
        ./ccp-template.json
}

ORG=1
P0PORT=7051
CAPORT=7054
P0PORT1=8051
P0PORT2=9051
P0PORT3=10051
P0PORT4=11051
P0PORT5=12051
P0PORT6=13051
P0PORT7=14051
P0PORT8=15051
P0PORT9=16051
PEERPEM=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM1=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM2=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM3=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM4=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM5=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM6=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM7=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM8=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer8.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem
PEERPEM9=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer9.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem


CAPEM=../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM $PEERPEM1 $P0PORT1)" > connection-org1.json

