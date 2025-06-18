<div className="py-2">
    <label className="form-label p-0 m-0 m-0 py-1" >Call Status <sup className="text-danger fw-bold">*</sup></label>
    <Flex gap={4} wrap align="center">
        {calltags?.map((tag) => (
            <Tag.CheckableTag
                key={tag}
                checked={coustomarFeedBack?.callStatus === tag}
                onChange={(checked) => handleCustomerFeedBack(tag, "callStatus", checked)}
                className={coustomarFeedBack?.callStatus === tag ? "tag-active" : "tag-inactive"}
            >
                {coustomarFeedBack?.callStatus === tag ? <p className="p-0 m-0">{tag}<img src={rightmark} className="ps-1" alt="" /></p> : tag}
            </Tag.CheckableTag>
        ))}
    </Flex>
</div>

const handleCustomerFeedBack = (feeDbackValue, feedBackName, checked) => {
    if (feedBackName === "callStatus") {
        const nextSelectedTag = checked ? feeDbackValue : null;
        setCoustomarFeedBack((prevState) => ({
            ...prevState,
            [feedBackName]: nextSelectedTag,
        }));
    }
}







const handleSearch = (value) => {
    setSearchValue(value);
    if (!value) {
        setShowData(allData);
        return;
    }
    const filtered = allData.filter(item =>
        item.customerName?.toLowerCase().includes(value.toLowerCase()) ||
        item.mobileNumber?.toLowerCase().includes(value.toLowerCase()) ||
        item.location?.toLowerCase().includes(value.toLowerCase()) ||
        item.description?.toLowerCase().includes(value.toLowerCase())
    );
    setShowData(filtered);
};