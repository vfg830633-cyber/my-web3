async function executePlatformPurchase() {
    // 1. 检查浏览器是否安装了 TronLink 钱包
    if (typeof window.tronWeb === 'undefined') {
        alert("请先安装并解锁您的 TronLink 浏览器扩展钱包！");
        return;
    }

    const tronWeb = window.tronWeb;
    
    // 这里使用波场 Shasta 测试网上的官方测试 USDT 合约地址进行安全测试
    // （如果是主网则为: TR7NHqjeKQxGTCi8q8XYZujQb61IAwM7gB）
    const usdtContractAddress = "TG3XXyExBkEeUHv7HiYcHsWfC656TIM96e"; 
    
    // 模拟一个合法的收款/业务合约地址（这里先用一个随机测试地址替代）
    const targetPlatformAddress = "TNo5g9e6f3GTCvXUfC656TIM96eX4pY6oN"; 
    
    const serviceCostUnits = 10 * 10**6; // 10 USDT (USDT在波场是6位小数精度)

    try {
        console.log("正在连接波场测试网 USDT 合约...");
        const usdtContract = await tronWeb.contract().at(usdtContractAddress);

        // 2. 触发钱包弹窗：请求用户授权具体的金额
        console.log("正在唤起 TronLink 授权弹窗...");
        alert("准备唤起 TronLink 钱包，请在弹窗中查看具体的授权限制，切勿勾选‘无限额度’！");

        const approvalTx = await usdtContract.approve(targetPlatformAddress, serviceCostUnits).send({
            feeLimit: 100000000 // 最大消耗 100 TRX 作为测试 Gas 费
        });
        
        console.log("链上授权成功！交易哈希:", approvalTx);
        alert("测试授权成功！交易已广播到测试网，哈希值:\n" + approvalTx);
        
    } catch (error) {
        console.error("交易被取消或失败:", error);
        alert("交互未完成。原因可能是您拒绝了签名，或钱包余额不足。");
    }
}
