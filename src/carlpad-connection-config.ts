export class CarlpadConnectionConfig{
    connectionType: string;
    
    wifiIp: string = "localhost";
    wifiPort: number = 1234;

    serialComPort: number;
    serialBitRate: number;
}