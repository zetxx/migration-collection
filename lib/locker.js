module.exports = (config) => ({
    lock: async() => 'locked',
    unlock: async() => 'unlocked'
});